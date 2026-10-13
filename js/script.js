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

  const MENU_EN = {
    drinks: [
      { name: "Aperol Spritz", desc: "Aperol, prosecco, soda water", price: "4.90 €" },
      { name: "Craft IPA beer", desc: "Local brewery, 0.4 l", price: "3.20 €" },
      { name: "Mojito", desc: "White rum, mint, lime", price: "4.50 €" },
      { name: "Homemade lemonade", desc: "Alcohol-free · seasonal", price: "2.50 €" }
    ],
    starters: [
      { name: "Hummus & tabbouleh", desc: "With grilled flatbread", price: "4.50 €" },
      { name: "Calamari", desc: "Fried, with lemon", price: "5.90 €" },
      { name: "Crostini", desc: "Tomato, basil, olive oil", price: "3.90 €" },
      { name: "Buffalo wings", desc: "6 pcs, blue cheese sauce", price: "5.50 €" }
    ],
    mains: [
      { name: "Grilled chicken", desc: "With roast potatoes and sauce", price: "8.90 €" },
      { name: "Classic burger", desc: "Beef, cheddar, bacon", price: "6.90 €" },
      { name: "Pasta carbonara", desc: "Guanciale, pecorino, egg", price: "6.90 €" },
      { name: "Striploin steak", desc: "250 g, green sauce, vegetables", price: "13.90 €" }
    ],
    desserts: [
      { name: "Tiramisu", desc: "Homemade", price: "3.90 €" },
      { name: "Cheesecake", desc: "With forest berries", price: "3.70 €" },
      { name: "Chocolate fondant", desc: "Molten centre, ice cream", price: "4.20 €" },
      { name: "Crème brûlée", desc: "Madagascar vanilla", price: "3.90 €" }
    ]
  };

  const tabs = document.querySelectorAll(".demo-tab");
  const itemsWrap = document.getElementById("demoItems");
  let currentCat = "drinks";

  function renderMenu(cat) {
    if (!itemsWrap) return;
    currentCat = cat;
    const source = document.documentElement.lang === "en" ? MENU_EN : MENU;
    const items = source[cat] || [];
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
  document.addEventListener("langchange", () => renderMenu(currentCat));

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
