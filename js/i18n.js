/* English translation for the portfolio.
   Bulgarian stays in index.html. Every element with data-i18n="key"
   gets the English text from EN[key] when the visitor switches to EN.
   Link for foreign companies: .../radoslav-portfolio/?lang=en */
(() => {
  "use strict";

  const EN = {
  "t0": "Skip to content",
  "t1": "Radoslav Chakarov",
  "t2": "Services",
  "t3": "How it works",
  "t4": "Demo",
  "t5": "Projects",
  "t6": "Contact",
  "t7": "Freelance development · Bars &amp; restaurants",
  "t8": "Your table menu, <span class=\"accent-text\">now on your guests’ phones.</span>",
  "t9": "I build digital QR menus and web apps for bars and restaurants — fast for guests, easy for you to manage, and no reprinting every time a price changes.",
  "t10": "See a demo menu",
  "t11": "Book a consultation",
  "t12": "reprinting after changes",
  "t13": "&lt;3&nbsp;sec",
  "t14": "menu load time",
  "t15": "24&nbsp;h",
  "t16": "reply to inquiries",
  "t17": "At Rado’s",
  "t18": "Table 4 · digital menu",
  "t19": "Drinks",
  "t20": "Mains",
  "t21": "Desserts",
  "t22": "Starters",
  "t23": "Aperol Spritz",
  "t24": "Aperol, prosecco, soda water",
  "t25": "Craft IPA beer",
  "t26": "Local brewery, 0.4 l",
  "t27": "Mojito",
  "t28": "White rum, mint, lime",
  "t29": "Homemade lemonade",
  "t30": "Alcohol-free · seasonal",
  "t31": "Espresso",
  "t32": "Double, Italian blend",
  "t33": "Scan the QR code on the table — the menu is always up to date.",
  "t34": "to reprint after changes",
  "t35": "instead of a stack of paper",
  "t36": "within 24&nbsp;h",
  "t37": "Packages that build on each other.",
  "t38": "I work directly with bar and restaurant owners — no agencies in between, with clear communication and deadlines. During the consultation I show you the admin panel live, so you can see how you’ll manage the menu yourself.",
  "t39": "Starter package",
  "t40": "Simple information website",
  "t41": "A one-page online business card — fast, and enough for businesses that for now just want to be found online.",
  "t42": "Home page with name, short description and photos",
  "t43": "Contact details and opening hours in plain sight",
  "t44": "Responsive design — phone, tablet and desktop",
  "t45": "Hosted on its own address, ready to share",
  "t46": "A base to upgrade to a menu or ordering",
  "t47": "Core package",
  "t48": "Digital QR menu",
  "t49": "Guests scan a code on the table and see the current menu on their phone — no waiting, no worn-out paper.",
  "t50": "Menu with categories, search and item photos",
  "t51": "Tap an item for details and a full description",
  "t52": "Admin panel — add, edit and delete at any time",
  "t53": "Availability control — mark items “sold out”",
  "t54": "Change the menu name and background photo",
  "t55": "Full ownership — hosting and database in your name",
  "t56": "Step-by-step setup instructions",
  "t57": "Automated package",
  "t58": "Menu with ordering",
  "t59": "Everything in the Core package, plus fully automated ordering — from the table straight to the bar.",
  "t60": "Everything included in the Core package",
  "t61": "Guests pick items directly on their phone",
  "t62": "Orders are sent with the table number in real time",
  "t63": "Bar screen with instant alerts (sound + visual)",
  "t64": "Sales statistics by period",
  "t65": "Faster service and fewer mistakes",
  "t66": "Custom",
  "t67": "Hotel website with bookings",
  "t68": "A website for a hotel or guesthouse with a built-in booking system — guests book directly with you, with no commission.",
  "t69": "Room pages with descriptions, photos and prices",
  "t70": "Availability calendar and direct online requests",
  "t71": "Automatic confirmation and notification for each booking",
  "t72": "Admin panel for rooms, prices and booked dates",
  "t73": "No monthly commission on bookings",
  "t74": "Full ownership — hosting and database in your name",
  "t75": "Website + Android app",
  "t76": "from 500&nbsp;€",
  "t77": "A complete custom system — a website and a native Android app, connected in real time to a shared database.",
  "t78": "Website with an admin panel for full control",
  "t79": "Native Android app (not a wrapped website)",
  "t80": "Instant notifications, automations and safeguards as needed",
  "t81": "The listed price is a starting point — the final amount depends on complexity and is agreed individually before work begins.",
  "t82": "Add-on modules",
  "t83": "Add only what your venue actually needs.",
  "t84": "Each module plugs into the Automated package for a fixed add-on price. Combine them freely — from one module to all of them.",
  "t85": "Inventory and stock",
  "t86": "Suppliers, restocking, automatic deduction on each sale, real cost and margin for every item.",
  "t87": "Shifts and till",
  "t88": "Staff schedule and till reconciliation — open and close shifts with the difference calculated automatically.",
  "t89": "Reservations",
  "t90": "Guests request a table directly from the menu; staff confirm or decline it from the admin panel.",
  "t91": "Automatic translation",
  "t92": "The menu is translated automatically into up to 8 languages (DeepL) — ideal for venues with international guests.",
  "t93": "Payment terms",
  "t94": "One-time payment — no monthly subscription for the app itself",
  "t95": "Hosting (Vercel + Supabase) is free on the chosen plan, in your name",
  "t96": "You can move to a paid hosting plan with more resources if you want",
  "t97": "Optional monthly support — by agreement",
  "t98": "Everything above is for information only — specific terms are agreed individually before work begins.",
  "t99": "From first call to a QR code on the table.",
  "t100": "Call",
  "t101": "We talk through the menu, the brand and what you want guests to feel.",
  "t102": "Design",
  "t103": "I design the menu or app to match the style of your venue.",
  "t104": "Development",
  "t105": "I build the digital menu or app and test it with you.",
  "t106": "Going live",
  "t107": "We place the QR codes on the tables — it’s ready for guests.",
  "t108": "Try a menu I built.",
  "t109": "The categories switch exactly as they do in a real QR menu at the table.",
  "t110": "At Rado’s — digital menu",
  "t111": "Live demo menu",
  "t112": "Demo with ordering",
  "t113": "Completed projects.",
  "t114": "Beyond digital menus, I build complete custom systems — a website and a native Android app connected in real time to a shared database. In my free time I make projects for my hometown of Krumovgrad and programs for Windows.",
  "t115": "Client project",
  "t116": "Car wash · Krumovgrad",
  "t117": "A complete digital booking system — website, native Android app and admin panel, connected in real time.",
  "t118": "Online appointment requests, with a check that the customer is in town",
  "t119": "Android app with instant notifications (Realtime, no Firebase)",
  "t120": "Admin panel — confirm, reschedule, set working days",
  "t121": "Automatic protection against repeat no-shows",
  "t122": "Reminders for the owner — a day before and an hour before",
  "t123": "Remote updates, without Google Play",
  "t124": "View site →",
  "t125": "Volunteer project",
  "t126": "Reporting platform",
  "t127": "Built entirely pro bono — connects people who spot a stray animal with approved shelters and clinics in real time.",
  "t128": "Submit a report with a photo and location, no sign-up needed",
  "t129": "Real-time map and feed of active reports",
  "t130": "Shelter and clinic sign-up with manual approval",
  "t131": "Admin dashboard — claim, release, resolved cases",
  "t132": "Separate roles for organizations, admins and visitors",
  "t133": "Personal project",
  "t134": "Map of local landmarks · Krumovgrad",
  "t135": "A non-commercial site about places worth visiting in Krumovgrad municipality — nature, history, water and churches on an interactive map, with my own drone videos.",
  "t136": "Interactive map with filters, search and directions to every place",
  "t137": "Residents suggest new places with a photo and GPS location",
  "t138": "Admin panel — approval, photos, drone video and credits",
  "t139": "Drone videos credited and linked to the pilot’s channel",
  "t140": "A separate SEO page for every place, in Bulgarian and English",
  "t141": "Database-level security (Supabase RLS)",
  "t142": "Rado’s Workshop",
  "t143": "Windows programs · C#/.NET and PowerShell",
  "t144": "Free, open-source Windows programs and a website to download them from. Built with AI and tested by me, with automated releases.",
  "t145": "Desktop Organizer — sorts the desktop into folders by file type",
  "t146": "Disk Cleanup — clears temporary files and cache",
  "t147": "Install Helper — software, printers and drivers for office PCs",
  "t148": "Windows installers in Bulgarian (Inno Setup)",
  "t149": "GitHub Actions — tag → build → installer → Release, no manual steps",
  "t150": "Automated code checks and a SHA-256 hash for every release",
  "t151": "Code on GitHub →",
  "t152": "Ready for a digital menu?",
  "t153": "Write to me and we’ll set up a short call about what your venue needs. The consultation is free, and I reply within 24 hours.",
  "t154": "Send an inquiry →",
  "t155": "Email",
  "t156": "Live demo",
  "t157": "Reply",
  "t158": "within 24 hours",
  "t159": "Consultation",
  "t160": "free",
  "t161": "© 2026 Radoslav Chakarov · Digital solutions for bars and restaurants",
  "t162": "Inquiry",
  "mark": "R"
};

  const META = {
    bg: {
      title: document.title,
      description: (document.querySelector('meta[name="description"]') || {}).content || "",
      mailSubject: "Запитване за дигитално меню"
    },
    en: {
      title: "Radoslav Chakarov — Digital menus & web solutions",
      description: "Digital QR menus and web apps for bars and restaurants. Fast for guests, easy to manage, no reprinting every time a price changes.",
      mailSubject: "Digital menu inquiry"
    }
  };

  const ARIA_EN = {
    "Основна навигация": "Main navigation",
    "Отвори меню": "Open menu",
    "Мобилна навигация": "Mobile navigation",
    "Накратко": "At a glance",
    "Категории на менюто": "Menu categories"
  };

  const root = document.documentElement;
  const toggle = document.getElementById("langToggle");
  const nodes = Array.from(document.querySelectorAll("[data-i18n]"));
  const ariaNodes = Array.from(document.querySelectorAll("[aria-label]"))
    .filter((el) => ARIA_EN[el.getAttribute("aria-label")]);
  const mailLinks = Array.from(document.querySelectorAll('a[href^="mailto:"]'));
  const metaDesc = document.querySelector('meta[name="description"]');

  // Remember the Bulgarian originals once
  nodes.forEach((el) => { el._bg = el.innerHTML; });
  ariaNodes.forEach((el) => { el._bg = el.getAttribute("aria-label"); });
  mailLinks.forEach((el) => { el._bg = el.getAttribute("href"); });

  function apply(lang) {
    const isEn = lang === "en";
    root.lang = isEn ? "en" : "bg";

    nodes.forEach((el) => {
      const t = EN[el.dataset.i18n];
      el.innerHTML = isEn && t ? t : el._bg;
    });
    ariaNodes.forEach((el) => {
      el.setAttribute("aria-label", isEn ? ARIA_EN[el._bg] : el._bg);
    });
    mailLinks.forEach((el) => {
      const base = el._bg.split("?")[0];
      el.setAttribute("href", base + "?subject=" + encodeURIComponent(META[root.lang].mailSubject));
    });

    document.title = META[root.lang].title;
    if (metaDesc) metaDesc.content = META[root.lang].description;

    if (toggle) {
      toggle.textContent = isEn ? "BG" : "EN";
      toggle.setAttribute("lang", isEn ? "bg" : "en");
      toggle.setAttribute("aria-label", isEn ? "Превключи на български" : "Switch to English");
    }

    document.dispatchEvent(new CustomEvent("langchange", { detail: root.lang }));
  }

  function save(lang) {
    try { localStorage.setItem("lang", lang); } catch (e) {}
    try {
      const url = new URL(location.href);
      url.searchParams.set("lang", lang);
      history.replaceState(null, "", url);
    } catch (e) {}
  }

  function initialLang() {
    try {
      const q = new URLSearchParams(location.search).get("lang");
      if (q === "en" || q === "bg") return q;
    } catch (e) {}
    try {
      const s = localStorage.getItem("lang");
      if (s === "en" || s === "bg") return s;
    } catch (e) {}
    // Visitors whose browser has no Bulgarian at all get English
    const langs = (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language || "bg"]);
    return langs.some((l) => /^bg\b/i.test(l)) ? "bg" : "en";
  }

  if (toggle) {
    toggle.addEventListener("click", () => {
      const next = root.lang === "en" ? "bg" : "en";
      apply(next);
      save(next);
    });
  }

  const start = initialLang();
  if (start === "en") apply("en");
})();
