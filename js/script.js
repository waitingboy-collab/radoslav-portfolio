(() => {
  "use strict";

  /* ---------- Mobile navigation ---------- */
  const burger = document.getElementById("burgerBtn");
  const mobileNav = document.getElementById("mobileNav");

  const closeMenu = () => {
    burger.setAttribute("aria-expanded", "false");
    mobileNav.classList.remove("is-open");
  };

  if (burger && mobileNav) {
    burger.addEventListener("click", () => {
      const isOpen = burger.getAttribute("aria-expanded") === "true";
      burger.setAttribute("aria-expanded", String(!isOpen));
      mobileNav.classList.toggle("is-open", !isOpen);
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeMenu();
    });
  }

  /* ---------- Demo menu tabs ---------- */
  const MENU = {
    drinks: [
      { name: "Аперол Шприц", desc: "Аперол, просеко, содена вода", price: "4.90 €" },
      { name: "Крафт бира IPA", desc: "Локална пивоварна, 0.4л", price: "3.20 €" },
      { name: "Мохито", desc: "Бял ром, мента, лайм", price: "4.50 €" },
      { name: "Домашна лимонада", desc: "Без алкохол · сезонна", price: "2.50 €" }
    ],
    starters: [
      { name: "Хумус табула", desc: "С питки на скара", price: "4.50 €" },
      { name: "Калмари", desc: "Пържени, с лимон", price: "5.90 €" },
      { name: "Кростини", desc: "Домат, босилек, зехтин", price: "3.90 €" },
      { name: "Крила Buffalo", desc: "6 бр., сос синьо сирене", price: "5.50 €" }
    ],
    mains: [
      { name: "Пилешко на скара", desc: "С печени картофи и сос", price: "8.90 €" },
      { name: "Класик бургер", desc: "Телешко, чедър, бекон", price: "6.90 €" },
      { name: "Паста Карбонара", desc: "Гуанчале, пекорино, яйце", price: "6.90 €" },
      { name: "Стриплойн стек", desc: "250г, зелен сос, зеленчуци", price: "13.90 €" }
    ],
    desserts: [
      { name: "Тирамису", desc: "Домашно приготвено", price: "3.90 €" },
      { name: "Чийзкейк", desc: "С горски плодове", price: "3.70 €" },
      { name: "Шоколадов фондан", desc: "Топло сърце, сладолед", price: "4.20 €" },
      { name: "Крем брюле", desc: "Ванилия от Мадагаскар", price: "3.90 €" }
    ]
  };

  const tabs = document.querySelectorAll(".demo-tab");
  const itemsWrap = document.getElementById("demoItems");

  function renderMenu(cat) {
    if (!itemsWrap) return;
    const items = MENU[cat] || [];
    itemsWrap.innerHTML = items
      .map(
        (i, idx) => `
        <div class="demo-item" style="animation-delay:${idx * 50}ms">
          <div>
            <div class="name">${i.name}</div>
            <div class="desc">${i.desc}</div>
          </div>
          <div class="price">${i.price}</div>
        </div>`
      )
      .join("");
  }

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => {
        t.classList.remove("is-active");
        t.setAttribute("aria-selected", "false");
      });
      tab.classList.add("is-active");
      tab.setAttribute("aria-selected", "true");
      renderMenu(tab.dataset.cat);
    });
  });

  renderMenu("drinks");

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach((el) => io.observe(el));

    // Safety net: guarantee every section becomes visible even if a user
    // never scrolls far enough, fast/synthetic scrolling skips the
    // intersection window, or a non-interactive renderer never scrolls at all.
    window.addEventListener("load", () => {
      setTimeout(() => {
        document.querySelectorAll(".reveal:not(.is-visible)").forEach((el) => {
          el.classList.add("is-visible");
        });
      }, 2500);
    });
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- Sticky CTA hide near footer/contact ---------- */
  const stickyCta = document.getElementById("stickyCta");
  const contactSection = document.getElementById("kontakti");
  if (stickyCta && contactSection && "IntersectionObserver" in window) {
    const io2 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          stickyCta.classList.toggle("is-hidden", entry.isIntersecting);
        });
      },
      { threshold: 0.35 }
    );
    io2.observe(contactSection);
  }

  /* ---------- Active nav link highlight ---------- */
  const navLinks = document.querySelectorAll(".nav-desktop a[href^='#']");
  const sections = Array.from(navLinks)
    .map((a) => document.querySelector(a.getAttribute("href")))
    .filter(Boolean);

  if (sections.length && "IntersectionObserver" in window) {
    const io3 = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = "#" + entry.target.id;
          const link = document.querySelector(`.nav-desktop a[href='${id}']`);
          if (!link) return;
          if (entry.isIntersecting) {
            navLinks.forEach((l) => l.removeAttribute("aria-current"));
            link.setAttribute("aria-current", "page");
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    sections.forEach((s) => io3.observe(s));
  }
})();
