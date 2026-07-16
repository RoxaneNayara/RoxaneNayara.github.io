"use strict";

document.addEventListener("DOMContentLoaded", () => {
  /* MENU RESPONSIVO */

  const menuToggle = document.querySelector("#menu-toggle");
  const mainMenu = document.querySelector("#main-menu");
  const menuLinks = document.querySelectorAll(
    "#main-menu a[href^='#']"
  );

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

      const menuIsOpen =
        mainMenu.classList.toggle("is-open");

      menuToggle.classList.toggle(
        "is-active",
        menuIsOpen
      );

      menuToggle.setAttribute(
        "aria-expanded",
        String(menuIsOpen)
      );

      menuToggle.setAttribute(
        "aria-label",
        menuIsOpen ? "Fechar menu" : "Abrir menu"
      );
    });

    document.addEventListener("click", (event) => {
      const clickedInsideMenu =
        mainMenu.contains(event.target);

      const clickedMenuButton =
        menuToggle.contains(event.target);

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

  /* NAVEGAÇÃO DAS SEÇÕES */

  menuLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();

      const targetId = link.getAttribute("href");
      const targetSection =
        document.querySelector(targetId);

      if (!targetSection) {
        return;
      }

      closeMenu();

      if (targetId === "#inicio") {
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });

        history.replaceState(null, "", targetId);
        return;
      }

      const header = document.querySelector(".header");
      const headerHeight = header
        ? header.offsetHeight
        : 80;

      const sectionContent =
        targetSection.querySelector(
          ".scroll-target, .section-heading, .contact-box"
        ) ?? targetSection;

      const targetPosition =
        sectionContent.getBoundingClientRect().top +
        window.scrollY -
        headerHeight -
        16;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      });

      history.replaceState(null, "", targetId);
    });
  });

  /* DESTAQUE DA SEÇÃO ATIVA */

  const sections = document.querySelectorAll(
    "main section[id]"
  );

  function activateMenuLink(sectionId) {
    menuLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${sectionId}`
      );
    });
  }

  function updateActiveSection() {
    const header = document.querySelector(".header");

    const headerOffset =
      (header ? header.offsetHeight : 80) + 40;

    const scrollPosition =
      window.scrollY + headerOffset;

    let currentSectionId = "inicio";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionBottom =
        sectionTop + section.offsetHeight;

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionBottom
      ) {
        currentSectionId = section.id;
      }
    });

    const nearPageBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 10;

    if (nearPageBottom) {
      currentSectionId = "contato";
    }

    activateMenuLink(currentSectionId);
  }

  window.addEventListener(
    "scroll",
    updateActiveSection,
    { passive: true }
  );

  window.addEventListener(
    "resize",
    updateActiveSection
  );

  updateActiveSection();

  /* ANIMAÇÕES REVEAL */

  const revealElements =
    document.querySelectorAll(".reveal");

  if (
    revealElements.length > 0 &&
    "IntersectionObserver" in window
  ) {
    document.body.classList.add("reveal-ready");

    const revealObserver = new IntersectionObserver(
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
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("is-visible");
    });
  }

  /* BOTÃO VOLTAR AO TOPO */

  const backToTopButton =
    document.querySelector("#back-to-top");

  function updateBackToTopButton() {
    if (!backToTopButton) {
      return;
    }

    backToTopButton.classList.toggle(
      "is-visible",
      window.scrollY > 600
    );
  }

  if (backToTopButton) {
    window.addEventListener(
      "scroll",
      updateBackToTopButton,
      { passive: true }
    );

    backToTopButton.addEventListener("click", () => {
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      window.scrollTo({
        top: 0,
        behavior: reduceMotion ? "auto" : "smooth"
      });
    });

    updateBackToTopButton();
  }

  /* COPIAR E-MAIL */

  const copyEmailButton =
    document.querySelector("#copy-email");

  const copyEmailStatus =
    document.querySelector("#copy-email-status");

  async function copyTextToClipboard(text) {
    if (
      navigator.clipboard &&
      window.isSecureContext
    ) {
      await navigator.clipboard.writeText(text);
      return;
    }

    const temporaryTextArea =
      document.createElement("textarea");

    temporaryTextArea.value = text;
    temporaryTextArea.setAttribute("readonly", "");
    temporaryTextArea.style.position = "fixed";
    temporaryTextArea.style.opacity = "0";

    document.body.appendChild(temporaryTextArea);

    temporaryTextArea.select();
    temporaryTextArea.setSelectionRange(
      0,
      temporaryTextArea.value.length
    );

    const copySucceeded =
      document.execCommand("copy");

    temporaryTextArea.remove();

    if (!copySucceeded) {
      throw new Error(
        "O navegador não permitiu copiar o texto."
      );
    }
  }

  if (copyEmailButton) {
    copyEmailButton.addEventListener(
      "click",
      async () => {
        const email =
          copyEmailButton.dataset.email;

        if (!email) {
          return;
        }

        try {
          await copyTextToClipboard(email);

          copyEmailButton.classList.add("is-copied");
          copyEmailButton.textContent = "Copiado!";

          if (copyEmailStatus) {
            copyEmailStatus.textContent =
              `${email} copiado para a área de transferência.`;
          }

          window.setTimeout(() => {
            copyEmailButton.classList.remove(
              "is-copied"
            );

            copyEmailButton.textContent = "Copiar";
          }, 2200);
        } catch (error) {
          copyEmailButton.textContent =
            "Erro ao copiar";

          if (copyEmailStatus) {
            copyEmailStatus.textContent =
              "Não foi possível copiar o e-mail automaticamente.";
          }

          window.setTimeout(() => {
            copyEmailButton.textContent = "Copiar";
          }, 2500);

          console.error(
            "Erro ao copiar o e-mail:",
            error
          );
        }
      }
    );
  }

  /* TEMA CLARO E ESCURO */

  const themeToggle =
    document.querySelector("#theme-toggle");

  if (!themeToggle) {
    return;
  }

  const themeIcon =
    themeToggle.querySelector("span");

  function applyTheme(theme) {
    const darkThemeIsActive =
      theme === "dark";

    document.body.classList.toggle(
      "dark-theme",
      darkThemeIsActive
    );

    if (themeIcon) {
      themeIcon.textContent =
        darkThemeIsActive ? "☀" : "☾";
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

  const savedTheme =
    localStorage.getItem("portfolio-theme");

  const systemPrefersDark =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

  const initialTheme =
    savedTheme ??
    (systemPrefersDark ? "dark" : "light");

  applyTheme(initialTheme);

  themeToggle.addEventListener("click", () => {
    const newTheme =
      document.body.classList.contains(
        "dark-theme"
      )
        ? "light"
        : "dark";

    localStorage.setItem(
      "portfolio-theme",
      newTheme
    );

    applyTheme(newTheme);
  });
});
