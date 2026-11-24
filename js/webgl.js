/* ==========================================================================
   WebGL фон: топли „течни“ петна (теракота, салвия, пясък) с фини
   топографски линии. Следват мишката/пръста и се движат с превъртането.
   Под показалеца фонът изпъква като леща, а светлината идва от него (релеф).
   Ако браузърът няма WebGL, остават старите CSS петна.
   ========================================================================== */
(() => {
  "use strict";

  const cv = document.createElement("canvas");
  cv.id = "gl-bg";
  cv.setAttribute("aria-hidden", "true");
  document.body.prepend(cv);

  const gl = cv.getContext("webgl", { antialias: false, alpha: false, premultipliedAlpha: false, powerPreference: "low-power" });
  if (!gl) { cv.remove(); return; }
  const deriv = gl.getExtension("OES_standard_derivatives");

  const reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;

  const vs = "attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}";
  const fs = (deriv ? "#extension GL_OES_standard_derivatives : enable\n#define HAS_D 1\n" : "") + `
  precision highp float;
  uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse; uniform float uScroll; uniform float uHover; uniform vec3 uSq;

  const vec3 BG     = vec3(0.969, 0.937, 0.882); // #f7efe1
  const vec3 SAGE   = vec3(0.906, 0.925, 0.863); // #e7ecdc
  const vec3 SAGE2  = vec3(0.835, 0.867, 0.773); // по-наситена салвия
  const vec3 PEACH  = vec3(0.976, 0.871, 0.776); // топло праскова
  const vec3 SAND   = vec3(0.953, 0.867, 0.722); // #f3ddb8
  const vec3 CREAM  = vec3(1.000, 0.973, 0.925); // #fff8ec
  const vec3 RUST   = vec3(0.576, 0.282, 0.122); // #93481f

  float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
  float noise(vec2 p){
    vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.-2.*f);
    return mix(mix(hash(i), hash(i+vec2(1.,0.)), u.x), mix(hash(i+vec2(0.,1.)), hash(i+vec2(1.,1.)), u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0., a = .5; for (int i = 0; i < 3; i++){ v += a*noise(p); p = p*2.03 + 17.1; a *= .5; } return v; }

  // меко петно, повтарящо се вертикално (период P), за да има петна по цялата страница
  float blob(vec2 q, vec2 c, float r, float P){
    vec2 d = q - c; d.y = mod(d.y + .5*P, P) - .5*P;
    return exp(-dot(d,d) / (r*r));
  }

  void main(){
    float s = min(uRes.x, uRes.y);
    vec2 p0 = (gl_FragCoord.xy - .5*uRes) / s;
    // изпъкване: под показалеца всичко се издува като леща
    vec2 d0 = p0 - uMouse;
    // при движение (наклон на телефона) изпъкването се разтяга по посоката като капка
    float sa = dot(d0, uSq.xy);
    vec2 dq = uSq.xy * (sa / uSq.z) + (d0 - uSq.xy * sa) * sqrt(uSq.z);
    float bump = exp(-dot(dq,dq) / .055) * (.45 + .55*uHover);
    vec2 p = uMouse + d0 * (1. - .38*bump);
    float hw = .5 * uRes.x / s;           // половин ширина в тези единици
    float t = uTime * .055;
    vec2 q = p; q.y -= uScroll;           // петната „лежат“ на страницата

    // органични ръбове
    vec2 w = vec2(fbm(q*1.25 + t), fbm(q*1.25 - t + 5.2)) - .5;
    q += .32 * w;

    float P = 2.6;
    float side = max(hw, .62);
    float b1 = blob(q, vec2( side*.78 + .08*sin(t*1.3),      .55 + .10*cos(t*1.1)), .46, P);
    float b2 = blob(q, vec2(-side*.86 + .06*cos(t*1.7),     -.35 + .08*sin(t*1.4)), .30, P);
    float b3 = blob(q, vec2( side*.92 + .07*sin(t*.9 + 2.),  -.85 + .12*cos(t*1.2)), .34, P);
    float b4 = blob(q, vec2(-side*.70 + .09*cos(t*1.1 + 1.),  .95 + .07*sin(t*1.6)), .38, P);
    float b5 = blob(q, vec2( side*.10 + .20*sin(t*.7),        .10 + .15*cos(t*.8)), .22, P);

    // петно, което следва показалеца (без повторение)
    vec2 m = uMouse; vec2 dm = (p + .32*w) - m;
    float bm = exp(-dot(dm,dm) / (.075 + .035*uHover)) * (.55 + .45*uHover);

    vec3 col = BG;
    col = mix(col, SAGE,  clamp(b1*1.30, 0., 1.));
    col = mix(col, SAGE2, clamp(b1*b1*.45, 0., 1.));
    col = mix(col, PEACH, clamp(b2*1.20, 0., 1.));
    col = mix(col, SAND,  clamp(b3*1.10, 0., 1.));
    col = mix(col, SAGE2, clamp(b4*0.55, 0., 1.));
    col = mix(col, CREAM, clamp(b5*0.80, 0., 1.));
    col = mix(col, PEACH, clamp(bm*0.85, 0., 1.));

    // топографски линии около петната
    float F = b1 + b2 + b3 + .8*b4 + .6*b5 + bm;
    float k = F * 7.0;
    float g = abs(fract(k) - .5);
    #ifdef HAS_D
      float aa = fwidth(k) * 1.2;
    #else
      float aa = .02;
    #endif
    float line = 1. - smoothstep(.0, aa, abs(g - .5) - .0);
    line *= smoothstep(.06, .35, F) * (1. - smoothstep(1.4, 2.2, F));
    col = mix(col, RUST, line * .10);

    // релеф: петната са възглавнички, куполът под показалеца изпъква, светлината идва от показалеца
    #ifdef HAS_D
      float Hh = F*.5 + bump*1.4;
      float K = s * .09;
      vec3 n = normalize(vec3(-dFdx(Hh)*K, -dFdy(Hh)*K, 1.));
      vec3 L = normalize(vec3(uMouse - p0, .6));
      col += (dot(n, L) - L.z) * .22;
      vec3 hv = normalize(L + vec3(0., 0., 1.));
      col += max(pow(max(dot(n, hv), 0.), 28.) - pow(hv.z, 28.), 0.) * .35;
    #endif

    // фин хартиен шум
    col += (hash(gl_FragCoord.xy + fract(uTime)*91.) - .5) * .016;
    gl_FragColor = vec4(col, 1.);
  }`;

  function sh(type, src){
    const s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { console.warn(gl.getShaderInfoLog(s)); return null; }
    return s;
  }
  const v = sh(gl.VERTEX_SHADER, vs), f = sh(gl.FRAGMENT_SHADER, fs);
  if (!v || !f) { cv.remove(); return; }
  const pr = gl.createProgram(); gl.attachShader(pr, v); gl.attachShader(pr, f); gl.linkProgram(pr);
  if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) { cv.remove(); return; }
  gl.useProgram(pr);
  const buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
  const loc = gl.getAttribLocation(pr, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
  const U = {}; ["uRes","uTime","uMouse","uScroll","uHover","uSq"].forEach((n) => { U[n] = gl.getUniformLocation(pr, n); });

  document.documentElement.classList.add("webgl");

  let W = 0, H = 0, scale = 1;
  function resize(){
    scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;   // меките градиенти не искат пълна резолюция
    W = Math.max(1, Math.round(cv.clientWidth * scale));
    H = Math.max(1, Math.round(cv.clientHeight * scale));
    if (cv.width !== W || cv.height !== H) { cv.width = W; cv.height = H; gl.viewport(0, 0, W, H); }
  }
  resize(); addEventListener("resize", resize);

  // показалец в шейдърни единици (y нагоре), с плавно догонване
  const target = { x: .35, y: .15 }, cur = { x: .35, y: .15 };
  let hover = 0, hoverTarget = 0, lastMove = 0;
  function toUnits(cx, cy){
    const s = Math.min(cv.clientWidth, cv.clientHeight);
    return { x: (cx - cv.clientWidth / 2) / s, y: -(cy - cv.clientHeight / 2) / s };
  }
  addEventListener("pointermove", (e) => { const u = toUnits(e.clientX, e.clientY); target.x = u.x; target.y = u.y; hoverTarget = 1; lastMove = performance.now(); }, { passive: true });
  // топче: при наклон на телефона изпъкването се търкаля; пръстът може да го хвърли
  const mb = { x: -1, y: -1, vx: 0, vy: 0 };
  let touching = false, lastTouchT = 0, lastStep = 0;
  const marbleOn = () => window.RadoTilt && window.RadoTilt.on;
  const onTouch = (e) => {
    const t = e.touches && e.touches[0]; if (!t) return;
    const now = performance.now(), dt = Math.max(8, now - lastTouchT) / 1000;
    if (touching && e.type === "touchmove") { mb.vx = (t.clientX - mb.x) / dt; mb.vy = (t.clientY - mb.y) / dt; } else { mb.vx = mb.vy = 0; }
    lastTouchT = now; touching = true; mb.x = t.clientX; mb.y = t.clientY;
    const u = toUnits(t.clientX, t.clientY); target.x = u.x; target.y = u.y; hoverTarget = 1; lastMove = now;
  };
  addEventListener("touchstart", onTouch, { passive: true });
  addEventListener("touchmove", onTouch, { passive: true });
  addEventListener("touchend", (e) => { if (!e.touches || !e.touches.length) touching = false; }, { passive: true });
  addEventListener("touchcancel", () => { touching = false; }, { passive: true });
  function stepMarble(now){
    const dt = Math.min(.05, lastStep ? (now - lastStep) / 1000 : .016); lastStep = now;
    if (!marbleOn()) return;
    const T = window.RadoTilt, vw = cv.clientWidth, vh = cv.clientHeight, m = 50;
    if (mb.x < 0) { mb.x = vw * .7; mb.y = vh * .4; }
    if (!touching) {
      mb.vx += T.x * 2400 * dt; mb.vy += T.y * 2400 * dt;
      const fr = Math.exp(-1.7 * dt); mb.vx *= fr; mb.vy *= fr;
      mb.x += mb.vx * dt; mb.y += mb.vy * dt;
      if (mb.x < m) { mb.x = m; mb.vx = Math.abs(mb.vx) * .55; }
      if (mb.x > vw - m) { mb.x = vw - m; mb.vx = -Math.abs(mb.vx) * .55; }
      if (mb.y < m + 60) { mb.y = m + 60; mb.vy = Math.abs(mb.vy) * .55; }
      if (mb.y > vh - m) { mb.y = vh - m; mb.vy = -Math.abs(mb.vy) * .55; }
      const u = toUnits(mb.x, mb.y); target.x = u.x; target.y = u.y;
    }
    hoverTarget = 1; lastMove = now;
  }
  addEventListener("pointerdown", (e) => { const u = toUnits(e.clientX, e.clientY); target.x = u.x; target.y = u.y; hoverTarget = 1; lastMove = performance.now(); }, { passive: true });
  document.addEventListener("pointerleave", () => { hoverTarget = 0; });

  let running = true, t0 = performance.now(), raf = 0, lastDraw = -1e9, sy = 0;
  const FRAME = 1000 / 30; // 30 кадъра стигат за бавните петна и оставят време за скрола
  function frame(now){
    raf = 0;
    if (!reduce && now - lastDraw < FRAME - 2) { if (running) raf = requestAnimationFrame(frame); return; }
    lastDraw = now;
    const t = reduce ? 12 : (now - t0) / 1000;
    if (!reduce && now - lastMove > 2500) {
      hoverTarget = 0;
      // без показалец петното бавно се разхожда
      target.x = Math.sin(t * .23) * .45; target.y = Math.cos(t * .17) * .25;
    }
    stepMarble(now);
    const k = reduce ? 1 : (marbleOn() ? .35 : .06);
    cur.x += (target.x - cur.x) * k; cur.y += (target.y - cur.y) * k;
    hover += (hoverTarget - hover) * .05;
    // плавен паралакс: петната догонват скрола, вместо да се синхронизират кадър по кадър
    const syT = window.scrollY / Math.min(cv.clientWidth, cv.clientHeight) * .35;
    sy += (syT - sy) * (reduce ? 1 : .08);
    gl.uniform2f(U.uRes, W, H);
    gl.uniform1f(U.uTime, t);
    gl.uniform2f(U.uMouse, cur.x, cur.y);
    gl.uniform1f(U.uScroll, sy);
    gl.uniform1f(U.uHover, hover);
    const sp = Math.hypot(mb.vx, mb.vy), st = marbleOn() ? 1 + Math.min(sp / 1600, .45) : 1;
    gl.uniform3f(U.uSq, sp > 1 ? mb.vx / sp : 1, sp > 1 ? -mb.vy / sp : 0, st);   // y нагоре в шейдъра
    gl.drawArrays(gl.TRIANGLES, 0, 3);
    if (running && !reduce) raf = requestAnimationFrame(frame);
  }
  function kick(){ if (!raf) raf = requestAnimationFrame(frame); }
  kick();
  if (reduce) { addEventListener("scroll", kick, { passive: true }); addEventListener("resize", kick); addEventListener("pointermove", kick, { passive: true }); }
  document.addEventListener("visibilitychange", () => {
    running = !document.hidden;
    if (running) kick(); else if (raf) { cancelAnimationFrame(raf); raf = 0; }
  });
  cv.addEventListener("webglcontextlost", (e) => { e.preventDefault(); running = false; document.documentElement.classList.remove("webgl"); cv.style.display = "none"; });
})();
