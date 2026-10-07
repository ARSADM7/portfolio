/* ============================================================
   Portfolio — comportamento da interface
   Objectivos: zero dependências, respeitar preferências do
   utilizador, e degradar com elegância se o JS falhar.
   ============================================================ */
(function () {
  "use strict";

  var THEME_KEY = "as-theme";

  /* ---------- Tema claro/escuro ---------- */
  var root = document.documentElement;

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* modo privado: seguir sem persistir */
    }
  }

  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {
      /* ignorado */
    }

    var prefersDark =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;

    applyTheme(saved || (prefersDark ? "dark" : "light"));
  }

  /* ---------- Menu móvel ---------- */
  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      toggle.setAttribute(
        "aria-label",
        open ? "Abrir menu" : "Fechar menu"
      );
      links.classList.toggle("is-open", !open);
    });

    links.addEventListener("click", function (event) {
      if (event.target.tagName !== "A") return;
      toggle.setAttribute("aria-expanded", "false");
      links.classList.remove("is-open");
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && links.classList.contains("is-open")) {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.focus();
      }
    });
  }

  /* ---------- Ano no rodapé ---------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Sombra no cabeçalho ao scrolls ---------- */
  function initHeaderShadow() {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var apply = function () {
      header.style.borderBottomColor =
        window.scrollY > 8 ? "var(--border)" : "transparent";
    };

    apply();
    window.addEventListener("scroll", apply, { passive: true });
  }

  /* ---------- Arrancar ---------- */
  function start() {
    initTheme();
    initNav();
    initYear();
    initHeaderShadow();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();