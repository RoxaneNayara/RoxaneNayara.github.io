(() => {
  const agentData = [
    {
      title: "Avaliador de Qualidade",
      input:
        "História de usuário, regra de negócio, critérios de aceite ou trecho de documentação.",
      support:
        "Organiza ambiguidades, lacunas, riscos, perguntas para refinamento e possibilidades de cenários de teste.",
      validation:
        "A análise deve ser revisada por QA e pelas pessoas responsáveis pela demanda, considerando contexto e regras reais."
    },
    {
      title: "Avaliador de Código",
      input:
        "Trecho de código ou automação preparado para revisão técnica.",
      support:
        "Destaca pontos relacionados a legibilidade, manutenção, padrões, tratamento de erros, complexidade e testabilidade.",
      validation:
        "As recomendações precisam ser avaliadas pelo time técnico, considerando arquitetura, padrões internos e objetivo da solução."
    }
  ];

  const tabsElement =
    document.querySelector("#ai-tabs");

  const titleElement =
    document.querySelector("#ai-title");

  const cardsElement =
    document.querySelector("#ai-cards");

  if (
    !tabsElement ||
    !titleElement ||
    !cardsElement
  ) {
    return;
  }

  let selectedIndex = 0;

  function renderTabs() {
    tabsElement.innerHTML = agentData
      .map(
        (item, index) => `
          <button
            class="ai-tab-button${index === selectedIndex ? " is-selected" : ""}"
            type="button"
            role="tab"
            aria-selected="${index === selectedIndex}"
            data-agent-index="${index}"
          >
            ${item.title}
          </button>
        `
      )
      .join("");
  }

  function renderPanel() {
    const item = agentData[selectedIndex];

    titleElement.textContent = item.title;

    cardsElement.innerHTML = `
      <article class="ai-info-card">
        <p>Tipo de entrada</p>
        <span>${item.input}</span>
      </article>

      <article class="ai-info-card">
        <p>Apoio oferecido</p>
        <span>${item.support}</span>
      </article>

      <article class="ai-info-card ai-info-card-highlight">
        <p>Validação necessária</p>
        <span>${item.validation}</span>
      </article>
    `;
  }

  tabsElement.addEventListener("click", (event) => {
    const button =
      event.target.closest("[data-agent-index]");

    if (!button) {
      return;
    }

    selectedIndex =
      Number(button.dataset.agentIndex);

    renderTabs();
    renderPanel();
  });

  renderTabs();
  renderPanel();
})();
