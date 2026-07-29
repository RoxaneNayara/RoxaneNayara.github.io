(() => {
  const onboardingData = [
    {
      title: "Papel de QA",
      learning:
        "Quality Assurance participa de todo o ciclo de vida do software e não apenas da etapa final de testes.",
      action:
        "QA colabora com recomendações, boas práticas e decisões sob a perspectiva da qualidade.",
      importance:
        "Ajuda o novo colaborador a compreender a área como parceira do processo e do produto."
    },
    {
      title: "Qualidade no ciclo",
      learning:
        "A qualidade é construída desde a ideação, passando por requisitos, design, desenvolvimento, testes e entrega.",
      action:
        "QA contribui ao longo das etapas, apoiando prevenção, análise e validação.",
      importance:
        "Evita que qualidade seja tratada apenas como uma verificação realizada no final."
    },
    {
      title: "Fluxo de atuação",
      learning:
        "QA participa do entendimento da demanda, refinamento, planejamento, desenvolvimento, revisão e homologação.",
      action:
        "A área colabora nos momentos em que decisões, riscos e critérios precisam ser discutidos.",
      importance:
        "Ajuda o profissional a envolver QA no momento adequado e com o contexto necessário."
    },
    {
      title: "Práticas de teste",
      learning:
        "A área realiza Pair Testing, testes exploratórios, testes de API, testes funcionais e não funcionais.",
      action:
        "As práticas são escolhidas conforme o contexto, o risco e a necessidade de validação.",
      importance:
        "Mostra que testar envolve diferentes abordagens e não apenas seguir roteiros previamente definidos."
    },
    {
      title: "Documentação e colaboração",
      learning:
        "Testes e incidentes são registrados em tarefas específicas no Azure DevOps.",
      action:
        "QA mantém evidências, registra bugs e colabora com Produto e Desenvolvimento ao longo do fluxo.",
      importance:
        "Favorece rastreabilidade, comunicação e acompanhamento das informações de qualidade."
    }
  ];

  const stepsElement =
    document.querySelector("#onboarding-steps");

  const titleElement =
    document.querySelector("#onboarding-title");

  const cardsElement =
    document.querySelector("#onboarding-cards");

  if (
    !stepsElement ||
    !titleElement ||
    !cardsElement
  ) {
    return;
  }

  const controlsElement =
    document.createElement("div");

  controlsElement.className =
    "onboarding-controls";

  controlsElement.setAttribute(
    "aria-label",
    "Navegação entre temas do onboarding"
  );

  cardsElement.insertAdjacentElement(
    "afterend",
    controlsElement
  );

  let selectedIndex = 0;

  function renderSteps() {
    stepsElement.innerHTML = onboardingData
      .map(
        (item, index) => `
          <button
            class="onboarding-step-button${
              index === selectedIndex
                ? " is-selected"
                : ""
            }"
            type="button"
            role="tab"
            aria-selected="${
              index === selectedIndex
            }"
            data-onboarding-index="${index}"
          >
            <span>${index + 1}</span>
            ${item.title}
          </button>
        `
      )
      .join("");
  }

  function renderPanel() {
    const item = onboardingData[selectedIndex];

    titleElement.textContent = item.title;

    cardsElement.innerHTML = `
      <article class="onboarding-info-card">
        <p>O que o novo colaborador aprende</p>
        <span>${item.learning}</span>
      </article>

      <article class="onboarding-info-card">
        <p>Como QA atua</p>
        <span>${item.action}</span>
      </article>

      <article class="onboarding-info-card onboarding-info-card-highlight">
        <p>Por que isso é importante</p>
        <span>${item.importance}</span>
      </article>
    `;
  }

  function renderControls() {
    controlsElement.innerHTML = `
      <button
        class="onboarding-control-button"
        type="button"
        data-onboarding-direction="previous"
        ${selectedIndex === 0 ? "disabled" : ""}
      >
        ← Anterior
      </button>

      <span class="onboarding-control-status">
        Tema ${selectedIndex + 1}
        de ${onboardingData.length}
      </span>

      <button
        class="onboarding-control-button"
        type="button"
        data-onboarding-direction="next"
        ${
          selectedIndex === onboardingData.length - 1
            ? "disabled"
            : ""
        }
      >
        Próximo →
      </button>
    `;
  }

  function render() {
    renderSteps();
    renderPanel();
    renderControls();
  }

  function scrollToSelectedTheme() {
    if (
      !window.matchMedia("(max-width: 760px)").matches
    ) {
      return;
    }

    const prefersReducedMotion =
      window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

    const header =
      document.querySelector(".header");

    const caseNavigation =
      document.querySelector(".case-navigation");

    const offset =
      (header?.offsetHeight ?? 76) +
      (caseNavigation?.offsetHeight ?? 0) +
      24;

    const top =
      titleElement.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion
        ? "auto"
        : "smooth"
    });
  }

  stepsElement.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-onboarding-index]"
      );

      if (!button) {
        return;
      }

      selectedIndex = Number(
        button.dataset.onboardingIndex
      );

      render();
    }
  );

  controlsElement.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-onboarding-direction]"
      );

      if (!button || button.disabled) {
        return;
      }

      const direction =
        button.dataset.onboardingDirection;

      const newIndex =
        direction === "next"
          ? selectedIndex + 1
          : selectedIndex - 1;

      if (
        newIndex < 0 ||
        newIndex >= onboardingData.length
      ) {
        return;
      }

      selectedIndex = newIndex;
      render();

      requestAnimationFrame(() => {
        scrollToSelectedTheme();
      });
    }
  );

  render();
})();
