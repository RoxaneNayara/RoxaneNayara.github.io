(() => {
  const selectionData = [
    {
      title: "Agilidade e colaboração",
      evaluated:
        "Compreensão do papel de QA no Scrum, participação em cerimônias e colaboração com Produto e Desenvolvimento.",
      method:
        "Questões conceituais e situações sobre planejamento, daily, review, retrospectiva e refinamento.",
      action:
        "Conduzi a avaliação como gestora de QA, aprofundando como o profissional compreendia a participação de QA no fluxo ágil."
    },
    {
      title: "Regras de negócio e riscos",
      evaluated:
        "Capacidade de interpretar critérios, criar cenários, aplicar técnicas e identificar ambiguidades e riscos.",
      method:
        "Situações práticas envolvendo regras de negócio, cobertura, cenários positivos e negativos e decisões sob pressão.",
      action:
        "Avaliei o raciocínio utilizado, a clareza das hipóteses e a capacidade de justificar decisões."
    },
    {
      title: "Testes e documentação",
      evaluated:
        "Conhecimentos sobre planejamento, técnicas de teste, incidentes, evidências, cobertura e rastreabilidade.",
      method:
        "Perguntas sobre testes exploratórios, classificação de inconsistências, abertura de bugs e documentação.",
      action:
        "Analisei como o profissional estruturava a abordagem de testes e comunicava resultados e riscos."
    },
    {
      title: "APIs e qualidade de produto",
      evaluated:
        "Entendimento sobre APIs, códigos de retorno, dados, autenticação, autorização e características de qualidade.",
      method:
        "Questões conceituais e exemplos relacionados a APIs e à aplicação prática de características de qualidade.",
      action:
        "Conduzi a discussão observando profundidade técnica, clareza e conexão com situações reais."
    },
    {
      title: "Automação e fundamentos técnicos",
      evaluated:
        "Capacidade de analisar código, desempenho, autenticação, padronização, refatoração e ampliação de validações.",
      method:
        "Análise de cenário técnico e perguntas sobre execução, token, padrões e asserts.",
      action:
        "Criei as questões e solicitei apoio do engenheiro de Qualidade para revisar o conteúdo e acrescentar fundamentos técnicos de Qualidade."
    }
  ];

  const areasElement =
    document.querySelector("#selection-areas");

  const titleElement =
    document.querySelector("#selection-title");

  const cardsElement =
    document.querySelector("#selection-cards");

  if (
    !areasElement ||
    !titleElement ||
    !cardsElement
  ) {
    return;
  }

  const controlsElement =
    document.createElement("div");

  controlsElement.className =
    "selection-controls";

  controlsElement.setAttribute(
    "aria-label",
    "Navegação entre eixos da avaliação técnica"
  );

  cardsElement.insertAdjacentElement(
    "afterend",
    controlsElement
  );

  let selectedIndex = 0;

  function renderAreas() {
    areasElement.innerHTML = selectionData
      .map(
        (item, index) => `
          <button
            class="selection-area-button${
              index === selectedIndex
                ? " is-selected"
                : ""
            }"
            type="button"
            role="tab"
            aria-selected="${
              index === selectedIndex
            }"
            data-selection-index="${index}"
          >
            ${item.title}
          </button>
        `
      )
      .join("");
  }

  function renderPanel() {
    const item = selectionData[selectedIndex];

    titleElement.textContent = item.title;

    cardsElement.innerHTML = `
      <article class="selection-info-card">
        <p>O que era avaliado</p>
        <span>${item.evaluated}</span>
      </article>

      <article class="selection-info-card">
        <p>Como era avaliado</p>
        <span>${item.method}</span>
      </article>

      <article
        class="selection-info-card
          selection-info-card-highlight"
      >
        <p>Como atuei</p>
        <span>${item.action}</span>
      </article>
    `;
  }

  function renderControls() {
    controlsElement.innerHTML = `
      <button
        class="selection-control-button"
        type="button"
        data-selection-direction="previous"
        ${selectedIndex === 0 ? "disabled" : ""}
      >
        ← Anterior
      </button>

      <span class="selection-control-status">
        Eixo ${selectedIndex + 1}
        de ${selectionData.length}
      </span>

      <button
        class="selection-control-button"
        type="button"
        data-selection-direction="next"
        ${
          selectedIndex === selectionData.length - 1
            ? "disabled"
            : ""
        }
      >
        Próximo →
      </button>
    `;
  }

  function render() {
    renderAreas();
    renderPanel();
    renderControls();
  }

  function scrollToSelectedAxis() {
    if (
      !window.matchMedia(
        "(max-width: 1024px)"
      ).matches
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
      document.querySelector(
        ".case-navigation"
      );

    const selectedLabel =
      titleElement.previousElementSibling;

    const targetElement =
      selectedLabel instanceof HTMLElement
        ? selectedLabel
        : titleElement;

    const offset =
      (header?.offsetHeight ?? 76) +
      (caseNavigation?.offsetHeight ?? 0) +
      24;

    const top =
      targetElement.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top,
      behavior: prefersReducedMotion
        ? "auto"
        : "smooth"
    });
  }

  areasElement.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-selection-index]"
      );

      if (!button) {
        return;
      }

      selectedIndex = Number(
        button.dataset.selectionIndex
      );

      render();
    }
  );

  controlsElement.addEventListener(
    "click",
    (event) => {
      const button = event.target.closest(
        "[data-selection-direction]"
      );

      if (!button || button.disabled) {
        return;
      }

      const direction =
        button.dataset.selectionDirection;

      const newIndex =
        direction === "next"
          ? selectedIndex + 1
          : selectedIndex - 1;

      if (
        newIndex < 0 ||
        newIndex >= selectionData.length
      ) {
        return;
      }

      selectedIndex = newIndex;
      render();

      requestAnimationFrame(() => {
        scrollToSelectedAxis();
      });
    }
  );

  render();
})();
