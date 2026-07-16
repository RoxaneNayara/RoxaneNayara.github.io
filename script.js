"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* MENU RESPONSIVO */

  const menuToggle = document.querySelector("#menu-toggle");
  const mainMenu = document.querySelector("#main-menu");
  const menuLinks = document.querySelectorAll("#main-menu a");

  function closeMenu() {
    if (!menuToggle || !mainMenu) {
      return;
    }

    mainMenu.classList.remove("is-open");
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const menuIsOpen = mainMenu.classList.toggle("is-open");

      menuToggle.classList.toggle("is-active", menuIsOpen);
      menuToggle.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
      );
      menuToggle.setAttribute(
        "aria-label",
        menuIsOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    menuLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu = mainMenu.contains(event.target);
      const clickedMenuButton = menuToggle.contains(event.target);

      if (!clickedInsideMenu && !clickedMenuButton) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) {
        closeMenu();
      }
    });
  }

  /* TEMA CLARO E ESCURO */

  const themeToggle = document.querySelector("#theme-toggle");

  if (!themeToggle) {
    return;
  }

  const themeIcon = themeToggle.querySelector("span");

  function applyTheme(theme) {
    const darkThemeIsActive = theme === "dark";

    document.body.classList.toggle(
      "dark-theme",
      darkThemeIsActive
    );

    if (themeIcon) {
      themeIcon.textContent = darkThemeIsActive ? "☀" : "☾";
    }

    themeToggle.setAttribute(
      "aria-label",
      darkThemeIsActive
        ? "Ativar tema claro"
        : "Ativar tema escuro"
    );

    themeToggle.setAttribute(
      "aria-pressed",
      String(darkThemeIsActive)
    );
  }

  const savedTheme = localStorage.getItem("portfolio-theme");

  const systemPrefersDark = window.matchMedia(
    "(prefers-color-scheme: dark)"
  ).matches;

  const initialTheme =
    savedTheme ?? (systemPrefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme =
      document.body.classList.contains("dark-theme")
        ? "light"
        : "dark";

    localStorage.setItem("portfolio-theme", newTheme);
    applyTheme(newTheme);
  });
});
