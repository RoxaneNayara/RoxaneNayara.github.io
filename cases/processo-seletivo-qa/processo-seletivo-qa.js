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

  let selectedIndex = 0;

  function renderAreas() {
    areasElement.innerHTML = selectionData
      .map(
        (item, index) => `
          <button
            class="selection-area-button${index === selectedIndex ? " is-selected" : ""}"
            type="button"
            role="tab"
            aria-selected="${index === selectedIndex}"
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

      <article class="selection-info-card selection-info-card-highlight">
        <p>Como atuei</p>
        <span>${item.action}</span>
      </article>
    `;
  }

  areasElement.addEventListener("click", (event) => {
    const button =
      event.target.closest("[data-selection-index]");

    if (!button) {
      return;
    }

    selectedIndex =
      Number(button.dataset.selectionIndex);

    renderAreas();
    renderPanel();
  });

  renderAreas();
  renderPanel();
})();
