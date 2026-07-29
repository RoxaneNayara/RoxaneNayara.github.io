(() => {
  const comparisonData = [
    {
      title: "Aderência ao C#",
      restsharp:
        "Compatível com C# e integrado ao ecossistema .NET.",
      playwright:
        "Compatível com C# e aplicável a testes de API, com possibilidade de ampliação futura.",
      conclusion:
        "As duas soluções atendiam à linguagem utilizada no desenvolvimento. O uso de C# facilitava a colaboração e a manutenção compartilhada entre QA e Desenvolvimento."
    },
    {
      title: "REST",
      restsharp:
        "Requisições REST automatizadas e respostas validadas com asserts.",
      playwright:
        "Requisições REST automatizadas e respostas validadas com asserts.",
      conclusion:
        "As duas ferramentas atenderam aos cenários REST avaliados na POC."
    },
    {
      title: "GraphQL",
      restsharp:
        "Templates e automações para requisições GraphQL.",
      playwright:
        "Templates e automações para requisições GraphQL.",
      conclusion:
        "As duas ferramentas atenderam aos cenários GraphQL avaliados."
    },
    {
      title: "Autenticação",
      restsharp:
        "Extração e uso de token durante as execuções.",
      playwright:
        "Extração de token e configuração externa para autenticação.",
      conclusion:
        "Ambas permitiram autenticação, com organização adicional no Playwright por arquivo externo."
    },
    {
      title: "Configuração de ambientes",
      restsharp:
        "Configuração dos ambientes por appsettings.",
      playwright:
        "Configuração dos ambientes por appsettings.",
      conclusion:
        "As duas soluções permitiram separar configurações conforme o ambiente."
    },
    {
      title: "Organização do código",
      restsharp:
        "Templates reutilizáveis e refatoração com padrões de organização.",
      playwright:
        "Templates reutilizáveis, refatoração e estrutura preparada para crescimento.",
      conclusion:
        "As duas permitiram organizar o projeto, mas o Playwright apresentou maior perspectiva de expansão."
    },
    {
      title: "Relatórios",
      restsharp:
        "A POC não documentou integração equivalente com relatório visual.",
      playwright:
        "Integração validada com Allure Report.",
      conclusion:
        "O Playwright apresentou vantagem para visualização estruturada dos resultados."
    },
    {
      title: "Paralelismo",
      restsharp:
        "O paralelismo não foi documentado como recurso validado na POC.",
      playwright:
        "Paralelismo aplicado para execução simultânea dos testes.",
      conclusion:
        "O Playwright apresentou vantagem para ganho de escala nas execuções."
    },
    {
      title: "Expansão para Web",
      restsharp:
        "Focado em chamadas HTTP e automação de APIs.",
      playwright:
        "Possibilidade de uso futuro em API e interfaces Web.",
      conclusion:
        "O Playwright foi considerado mais adequado para uma estratégia de automação ampliável."
    },
    {
      title: "Integrações e escalabilidade",
      restsharp:
        "Atendia ao desafio de automação de API.",
      playwright:
        "Possibilidade de integração com Azure DevOps, GitHub e Docker, além de relatórios e paralelismo.",
      conclusion:
        "O Playwright foi escolhido por reunir aderência à stack, amplitude de uso e melhor perspectiva de escalabilidade."
    }
  ];

  const evolutionData = {
    timeline: [
      {
        status: "Validado na POC",
        title: "Comparação técnica",
        description:
          "RestSharp e Playwright foram avaliados em C# com cenários REST e GraphQL."
      },
      {
        status: "Selecionado",
        title: "Playwright",
        description:
          "A ferramenta foi escolhida por relatórios, paralelismo, integrações e possibilidade de expansão."
      },
      {
        status: "Implantado",
        title: "Automação de API",
        description:
          "Os testes automatizados em C# passaram a funcionar cobrindo REST e GraphQL."
      },
      {
        status: "Em implantação",
        title: "Pipeline",
        description:
          "A integração das execuções automatizadas à pipeline corporativa permanece em andamento."
      }
    ],
    currentState: [
      {
        title: "Linguagem",
        status: "Implantado",
        description:
          "Automação mantida em C#, alinhada à linguagem utilizada no desenvolvimento das aplicações."
      },
      {
        title: "Tipos de API",
        status: "Em funcionamento",
        description:
          "Testes automatizados cobrindo APIs REST e GraphQL."
      },
      {
        title: "Relatórios",
        status: "Em funcionamento",
        description:
          "Allure Report utilizado para consulta e análise dos resultados."
      },
      {
        title: "Paralelismo",
        status: "Mantido",
        description:
          "Execução paralela preservada na solução implantada."
      },
      {
        title: "Versionamento",
        status: "Implantado",
        description:
          "Scripts armazenados em repositório corporativo dentro do projeto no Azure DevOps."
      },
      {
        title: "Pipeline",
        status: "Em implantação",
        description:
          "Integração dos testes automatizados à pipeline ainda em andamento."
      }
    ]
  };

  const viewButtons = Array.from(
    document.querySelectorAll("[data-view]")
  );

  const comparisonView =
    document.querySelector("#poc-comparison-view");

  const evolutionView =
    document.querySelector("#poc-evolution-view");

  const criteriaElement =
    document.querySelector("#poc-criteria");

  const criterionTitleElement =
    document.querySelector("#poc-criterion-title");

  const comparisonCardsElement =
    document.querySelector("#poc-comparison-cards");

  const timelineElement =
    document.querySelector("#poc-timeline");

  const currentStateElement =
    document.querySelector("#poc-current-state");

  const comparisonControlsElement =
  document.createElement("div");

comparisonControlsElement.className =
  "poc-comparison-controls";

comparisonControlsElement.setAttribute(
  "aria-label",
  "Navegação entre critérios da comparação"
);

comparisonCardsElement.insertAdjacentElement(
  "afterend",
  comparisonControlsElement
);

  if (
    viewButtons.length === 0 ||
    !comparisonView ||
    !evolutionView ||
    !criteriaElement ||
    !criterionTitleElement ||
    !comparisonCardsElement ||
    !timelineElement ||
    !currentStateElement
  ) {
    return;
  }

  let selectedCriterionIndex = 0;

  function statusClass(status) {
    return status
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-");
  }

  function renderCriteria() {
    criteriaElement.innerHTML = comparisonData
      .map(
        (item, index) => `
          <button
            class="poc-criterion-button${index === selectedCriterionIndex ? " is-selected" : ""}"
            type="button"
            data-criterion-index="${index}"
          >
            ${item.title}
          </button>
        `
      )
      .join("");
  }

  function renderComparison() {
    const item = comparisonData[selectedCriterionIndex];

    criterionTitleElement.textContent = item.title;

    comparisonCardsElement.innerHTML = `
      <article class="poc-result-card">
        <p>RestSharp</p>
        <h4>Resultado na POC</h4>
        <span>${item.restsharp}</span>
      </article>

      <article class="poc-result-card">
        <p>Playwright</p>
        <h4>Resultado na POC</h4>
        <span>${item.playwright}</span>
      </article>

      <article class="poc-result-card poc-result-card-conclusion">
        <p>Conclusão</p>
        <h4>Leitura da avaliação</h4>
        <span>${item.conclusion}</span>
      </article>
    `;
  }

  function renderEvolution() {
    timelineElement.innerHTML = evolutionData.timeline
      .map(
        (item) => `
          <article class="poc-timeline-item">
            <span class="poc-status poc-status-${statusClass(item.status)}">
              ${item.status}
            </span>
            <h4>${item.title}</h4>
            <p>${item.description}</p>
          </article>
        `
      )
      .join("");

    currentStateElement.innerHTML = `
      <h3>Estado atual da solução</h3>

      <div class="poc-state-grid">
        ${evolutionData.currentState
          .map(
            (item) => `
              <article class="poc-state-card">
                <span class="poc-status poc-status-${statusClass(item.status)}">
                  ${item.status}
                </span>
                <h4>${item.title}</h4>
                <p>${item.description}</p>
              </article>
            `
          )
          .join("")}
      </div>
    `;
  }

  function selectView(viewName) {
    const isComparison = viewName === "comparison";

    comparisonView.hidden = !isComparison;
    evolutionView.hidden = isComparison;

    viewButtons.forEach((button) => {
      const isSelected =
        button.dataset.view === viewName;

      button.classList.toggle(
        "is-selected",
        isSelected
      );

      button.setAttribute(
        "aria-selected",
        String(isSelected)
      );
    });
  }

  viewButtons.forEach((button) => {
    button.addEventListener("click", () => {
      selectView(button.dataset.view);
    });
  });

  criteriaElement.addEventListener("click", (event) => {
    const button =
      event.target.closest("[data-criterion-index]");

    if (!button) {
      return;
    }

    selectedCriterionIndex =
      Number(button.dataset.criterionIndex);

    renderCriteria();
    renderComparison();
  });
  
    function renderComparisonControls() {
    comparisonControlsElement.innerHTML = `
      <button
        class="poc-comparison-control-button"
        type="button"
        data-comparison-direction="previous"
        ${selectedCriterionIndex === 0 ? "disabled" : ""}
      >
        ← Anterior
      </button>
  
      <span class="poc-comparison-control-status">
        Critério ${selectedCriterionIndex + 1}
        de ${comparisonData.length}
      </span>
  
      <button
        class="poc-comparison-control-button"
        type="button"
        data-comparison-direction="next"
        ${
          selectedCriterionIndex === comparisonData.length - 1
            ? "disabled"
            : ""
        }
      >
        Próximo →
      </button>
    `;
  }

    function renderSelectedComparison() {
    renderCriteria();
    renderComparison();
    renderComparisonControls();
  }

    function scrollToComparisonStart() {
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
      criterionTitleElement.getBoundingClientRect().top +
      window.scrollY -
      offset;
  
    window.scrollTo({
      top,
      behavior: prefersReducedMotion
        ? "auto"
        : "smooth"
    });
  }

  renderSelectedComparison();
  renderEvolution();
})();
