/* ---------- 3D карти: изпъкват към посетителя ----------
   • С мишка: картата се накланя към показалеца, повдига се, заглавието излиза
     напред, а по нея минава отблясък.
   • На телефон: картите леко се превъртат като барабан, докато минават през екрана,
     и се накланят заедно с телефона (жироскоп).
   • При prefers-reduced-motion нищо не се движи. */
(function(){
  'use strict';
  var SELECTOR = '.pkg-card, .module-card, .project-card, .contact-card';
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduce || !('IntersectionObserver' in window)) return;
  var fine = window.matchMedia && matchMedia('(hover: hover) and (pointer: fine)').matches;
  var cards = Array.prototype.slice.call(document.querySelectorAll(SELECTOR));
  if (!cards.length) return;
  document.documentElement.classList.add('fx');

  cards.forEach(function(c){
    c.classList.add('tilt');
    var g = document.createElement('span');
    g.className = 'glare'; g.setAttribute('aria-hidden', 'true');
    c.appendChild(g);
  });

  function set(c, rx, ry, gx, gy){
    c.style.setProperty('--rx', rx.toFixed(2) + 'deg');
    c.style.setProperty('--ry', ry.toFixed(2) + 'deg');
    c.style.setProperty('--gx', gx.toFixed(1) + '%');
    c.style.setProperty('--gy', gy.toFixed(1) + '%');
    c.style.setProperty('--sx', (-ry * 1.4).toFixed(1) + 'px');
    c.style.setProperty('--sy', (rx * 1.4).toFixed(1) + 'px');
  }

  if (fine){
    cards.forEach(function(c){
      var raf = 0, ex = 0, ey = 0;
      var big = c.offsetWidth > 700;          // широките карти се накланят по-малко
      var MAX = big ? 5 : 10;
      c.addEventListener('pointerenter', function(){ c.classList.add('tilting'); });
      c.addEventListener('pointermove', function(e){
        ex = e.clientX; ey = e.clientY;
        if (raf) return;
        raf = requestAnimationFrame(function(){
          raf = 0;
          var r = c.getBoundingClientRect();
          var x = Math.min(1, Math.max(0, (ex - r.left) / r.width));
          var y = Math.min(1, Math.max(0, (ey - r.top) / r.height));
          set(c, (.5 - y) * MAX, (x - .5) * MAX, x * 100, y * 100);
        });
      });
      c.addEventListener('pointerleave', function(){
        if (raf){ cancelAnimationFrame(raf); raf = 0; }
        c.classList.remove('tilting'); set(c, 0, 0, 50, 0);
      });
    });
    return;
  }

  // телефон: „барабан“ при скрол — само за видимите карти; първо четем, после пишем
  var vis = [];
  var io = new IntersectionObserver(function(es){
    es.forEach(function(e){
      var i = vis.indexOf(e.target);
      if (e.isIntersecting && i < 0) vis.push(e.target);
      if (!e.isIntersecting && i >= 0) vis.splice(i, 1);
    });
    queue();
  }, { rootMargin: '10% 0px' });
  cards.forEach(function(c){ c.classList.add('rolling'); io.observe(c); });
  var pending = false;
  function update(){
    pending = false;
    var vh = window.innerHeight, rects = vis.map(function(c){ return c.getBoundingClientRect(); });
    vis.forEach(function(c, i){
      var r = rects[i];
      var k = Math.max(-1, Math.min(1, ((r.top + r.height / 2) - vh / 2) / vh)); // -1 горе … 1 долу
      var T = window.RadoTilt || { x:0, y:0 };
      // наклонът на телефона завърта картата и мести отблясъка
      set(c, -k * 5 - T.y * 9, T.x * 12, 50 - T.x * 60, 50 + k * 70 - T.y * 60);
    });
  }
  function queue(){ if (!pending){ pending = true; requestAnimationFrame(update); } }
  addEventListener('scroll', queue, { passive: true });
  addEventListener('resize', queue);
  addEventListener('radotilt', queue);
})();
