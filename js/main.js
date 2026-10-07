/* ============================================================
   Portfolio — comportamento
   Sem dependências. Tudo degrada com elegância se o JS falhar.
   ============================================================ */
(function () {
  "use strict";

  var THEME_KEY = "portfolio:theme";
  var root = document.documentElement;

  /* ---------- Tema ---------- */
  function currentIsDark() {
    var attr = root.getAttribute("data-theme");
    if (attr) return attr === "dark";
    return (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  }

  function paintToggle() {
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;
    btn.setAttribute(
      "aria-label",
      currentIsDark() ? "Mudar para tema claro" : "Mudar para tema escuro"
    );
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* modo privado: funciona, só não persiste */
    }
    paintToggle();
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

    // Botão
    var btn = document.getElementById("theme-toggle");
    if (!btn) return;

    btn.addEventListener("click", function () {
      applyTheme(currentIsDark() ? "light" : "dark");
    });

    // Acompanhar o sistema enquanto não houver escolha manual
    if (!saved && window.matchMedia) {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onChange = function (event) {
        applyTheme(event.matches ? "dark" : "light");
      };
      if (mq.addEventListener) mq.addEventListener("change", onChange);
      else if (mq.addListener) mq.addListener(onChange);
    }
  }

  /* ---------- Menu móvel ---------- */
  function initNav() {
    var toggle = document.getElementById("nav-toggle");
    var links = document.getElementById("nav-links");
    if (!toggle || !links) return;

    function setOpen(open) {
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
      links.classList.toggle("is-open", open);
    }

    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });

    links.addEventListener("click", function (event) {
      if (event.target.closest("a")) setOpen(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && links.classList.contains("is-open")) {
        setOpen(false);
        toggle.focus();
      }
    });

    // Ao voltar para desktop, fechar para não ficar preso
    window.addEventListener("resize", function () {
      if (window.innerWidth > 736) setOpen(false);
    });
  }

  /* ---------- Ano ---------- */
  function initYear() {
    var el = document.getElementById("year");
    if (el) el.textContent = String(new Date().getFullYear());
  }

  /* ---------- Borda da barra ao fazer scroll ---------- */
  function initStuck() {
    var bar = document.querySelector(".topbar");
    if (!bar) return;

    var ticking = false;
    function update() {
      bar.setAttribute("data-stuck", String(window.scrollY > 8));
      ticking = false;
    }

    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          window.requestAnimationFrame(update);
        }
      },
      { passive: true }
    );

    update();
  }

  function start() {
    initTheme();
    initNav();
    initYear();
    initStuck();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
})();