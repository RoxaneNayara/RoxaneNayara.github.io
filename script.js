"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.querySelector("#menu-toggle");
  const mainMenu = document.querySelector("#main-menu");
  const menuLinks = document.querySelectorAll(
    "#main-menu a[href^='#']"
  );

  function closeMenu() {
    if (!menuToggle || !mainMenu) return;

    mainMenu.classList.remove("is-open");
    menuToggle.classList.remove("is-active");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Abrir menu");
  }

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = mainMenu.classList.toggle("is-open");
      menuToggle.classList.toggle("is-active", isOpen);
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    document.addEventListener("click", (event) => {
      if (
        !mainMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 900) closeMenu();
    });
  }

  function getHeaderOffset() {
    const header = document.querySelector(".header");
    return (header ? header.offsetHeight : 76) + 18;
  }

  function scrollToTarget(target, updateHash = true) {
    if (!target) return;

    const top =
      target.getBoundingClientRect().top +
      window.scrollY -
      getHeaderOffset();

    window.scrollTo({
      top,
      behavior: window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches
        ? "auto"
        : "smooth"
    });

    if (updateHash && target.id) {
      history.replaceState(null, "", `#${target.id}`);
    }
  }

  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");
      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();
      closeMenu();
      scrollToTarget(target);
    });
  });

  document
    .querySelectorAll('.hero-actions a[href^="#"]')
    .forEach((link) => {
      link.addEventListener("click", (event) => {
        const target = document.querySelector(
          link.getAttribute("href")
        );

        if (!target) return;

        event.preventDefault();
        scrollToTarget(target);
      });
    });

  const sections = document.querySelectorAll("main section[id]");

  function activateMenuLink(sectionId) {
    menuLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${sectionId}`
      );
    });
  }

  function updateActiveSection() {
    const scrollPosition =
      window.scrollY + getHeaderOffset() + 22;

    let currentSectionId = "inicio";

    sections.forEach((section) => {
      const top = section.offsetTop;
      const bottom = top + section.offsetHeight;

      if (
        scrollPosition >= top &&
        scrollPosition < bottom
      ) {
        currentSectionId = section.id;
      }
    });

    const nearBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10;

    if (nearBottom) currentSectionId = "contato";

    activateMenuLink(currentSectionId);
  }

  window.addEventListener("scroll", updateActiveSection, {
    passive: true
  });
  window.addEventListener("resize", updateActiveSection);
  updateActiveSection();

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    revealElements.length &&
    "IntersectionObserver" in window
  ) {
    document.body.classList.add("reveal-ready");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle(
            "is-visible",
            entry.isIntersecting
          );
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -50px 0px"
      }
    );

    revealElements.forEach((element) => {
      observer.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  const backToTop = document.querySelector("#back-to-top");

  function updateBackToTop() {
    if (!backToTop) return;

    backToTop.classList.toggle(
      "is-visible",
      window.scrollY > 600
    );
  }

  if (backToTop) {
    window.addEventListener("scroll", updateBackToTop, {
      passive: true
    });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches
          ? "auto"
          : "smooth"
      });
    });

    updateBackToTop();
  }

  const copyEmailButton =
    document.querySelector("#copy-email");
  const copyEmailStatus =
    document.querySelector("#copy-email-status");

  async function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();

    const copied = document.execCommand("copy");
    textarea.remove();

    if (!copied) {
      throw new Error("Não foi possível copiar.");
    }
  }

  if (copyEmailButton) {
    copyEmailButton.addEventListener("click", async () => {
      const email = copyEmailButton.dataset.email;
      if (!email) return;

      try {
        await copyText(email);
        copyEmailButton.classList.add("is-copied");
        copyEmailButton.textContent = "Copiado!";

        if (copyEmailStatus) {
          copyEmailStatus.textContent =
            `${email} copiado para a área de transferência.`;
        }

        window.setTimeout(() => {
          copyEmailButton.classList.remove("is-copied");
          copyEmailButton.textContent = "Copiar";
        }, 2200);
      } catch (error) {
        copyEmailButton.textContent = "Erro ao copiar";

        if (copyEmailStatus) {
          copyEmailStatus.textContent =
            "Não foi possível copiar o e-mail automaticamente.";
        }

        window.setTimeout(() => {
          copyEmailButton.textContent = "Copiar";
        }, 2500);

        console.error(error);
      }
    });
  }

  const themeToggle = document.querySelector("#theme-toggle");

  if (themeToggle) {
    const themeIcon = themeToggle.querySelector("span");

    function applyTheme(theme) {
      const isDark = theme === "dark";

      document.body.classList.toggle("dark-theme", isDark);

      if (themeIcon) {
        themeIcon.textContent = isDark ? "☀" : "☾";
      }

      themeToggle.setAttribute(
        "aria-label",
        isDark ? "Ativar tema claro" : "Ativar tema escuro"
      );
      themeToggle.setAttribute(
        "aria-pressed",
        String(isDark)
      );
    }

    const savedTheme =
      localStorage.getItem("portfolio-theme");
    const systemPrefersDark =
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;

    applyTheme(
      savedTheme ??
        (systemPrefersDark ? "dark" : "light")
    );

    themeToggle.addEventListener("click", () => {
      const nextTheme =
        document.body.classList.contains("dark-theme")
          ? "light"
          : "dark";

      localStorage.setItem(
        "portfolio-theme",
        nextTheme
      );
      applyTheme(nextTheme);
    });
  }

  function positionFromHash() {
    const hash = window.location.hash;

    if (!/^#case-\d{2}$/.test(hash)) return;

    const target = document.querySelector(hash);
    if (!target) return;

    window.requestAnimationFrame(() => {
      window.scrollTo({
        top:
          target.getBoundingClientRect().top +
          window.scrollY -
          getHeaderOffset(),
        behavior: "auto"
      });
      target.classList.add("is-visible");
    });
  }

  window.addEventListener("pageshow", positionFromHash);
  positionFromHash();
});
