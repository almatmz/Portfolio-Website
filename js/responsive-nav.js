(function () {
  function ready(fn) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", fn);
    } else {
      fn();
    }
  }

  ready(function () {
    var header = document.querySelector(".site-header");
    if (!header) return;

    var headerRight = header.querySelector(".header-right");
    var nav = header.querySelector(".main-nav");
    if (!headerRight || !nav) return;

    if (headerRight.querySelector(".nav-toggle")) return;

    var btn = document.createElement("button");
    btn.className = "nav-toggle";
    btn.type = "button";
    btn.setAttribute("aria-label", "Toggle navigation");
    btn.setAttribute("aria-expanded", "false");

    var bars = document.createElement("span");
    bars.className = "nav-toggle-bars";
    btn.appendChild(bars);

    headerRight.insertBefore(btn, nav);

    function closeMenu() {
      nav.classList.remove("is-open");
      btn.setAttribute("aria-expanded", "false");
      document.body.classList.remove("menu-open");
    }

    function openMenu() {
      nav.classList.add("is-open");
      btn.setAttribute("aria-expanded", "true");
      document.body.classList.add("menu-open");
    }

    function toggleMenu() {
      if (nav.classList.contains("is-open")) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    btn.addEventListener("click", toggleMenu);

    nav.addEventListener("click", function (e) {
      var target = e.target;
      if (target && target.tagName === "A") {
        closeMenu();
      }
    });

    document.addEventListener("click", function (e) {
      if (!header.contains(e.target) && nav.classList.contains("is-open")) {
        closeMenu();
      }
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        closeMenu();
      }
    });
  });
})();
