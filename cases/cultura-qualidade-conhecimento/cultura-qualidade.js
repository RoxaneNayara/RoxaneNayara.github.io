(() => {
  const cultureData = [
    {
      title: "Compartilhamento de conhecimento",
      topics: [
        {
          title: "Papo em Produção",
          need:
            "Criar um espaço em que diferentes áreas de TI pudessem apresentar temas e compartilhar conhecimento.",
          action:
            "Foi criada uma iniciativa interna aberta à participação de profissionais de diferentes times.",
          contribution:
            "Ampliou a circulação de conhecimento e aproximou especialidades dentro de Tecnologia."
        },
        {
          title: "Participação de diferentes áreas",
          need:
            "Evitar que o conhecimento permanecesse concentrado apenas dentro de cada time.",
          action:
            "Profissionais de áreas distintas puderam apresentar temas relacionados às próprias atuações.",
          contribution:
            "Favoreceu visão sistêmica, colaboração e entendimento entre funções."
        }
      ]
    },
    {
      title: "Melhoria contínua",
      topics: [
        {
          title: "Fluxo e cerimônias",
          need:
            "Revisar práticas de trabalho, participação de QA e organização das cerimônias.",
          action:
            "Foram realizadas reuniões sobre board, dailies, planning, review, retrospectiva e refinamento.",
          contribution:
            "Apoiou maior clareza sobre fluxo, responsabilidades e momentos de colaboração."
        },
        {
          title: "Testes e governança",
          need:
            "Acompanhar a evolução de planejamento, riscos, bugs, métricas, TMMi e documentação.",
          action:
            "Foram organizados estudos, reuniões e acompanhamentos com diferentes times e lideranças.",
          contribution:
            "Fortaleceu rastreabilidade, governança e melhoria contínua dos processos de Qualidade."
        },
        {
          title: "Automação e métricas",
          need:
            "Preparar a área para evoluir automação, cobertura e acompanhamento dos resultados.",
          action:
            "Foram conduzidos estudos e levantamentos sobre automação de API, métricas e cobertura.",
          contribution:
            "Criou base para decisões técnicas e evolução estruturada da área."
        }
      ]
    },
    {
      title: "Boas práticas de Qualidade",
      topics: [
        {
          title: "Processos",
          need:
            "Consolidar práticas esperadas ao longo do ciclo de desenvolvimento.",
          action:
            "O checklist reuniu shift-left, refinamento, planejamento, Pair Testing, dailies, retrospectivas e Smoke Tests.",
          contribution:
            "Ajudou a padronizar a participação de QA e a construção da qualidade desde o início."
        },
        {
          title: "Testware",
          need:
            "Definir como resultados, evidências e insumos deveriam ser registrados e comunicados.",
          action:
            "Foram organizadas orientações para documentação de resultados, anexos, Smoke Tests e comportamentos inesperados.",
          contribution:
            "Favoreceu rastreabilidade, comunicação e organização dos artefatos de teste."
        },
        {
          title: "Cobertura Web e Desktop",
          need:
            "Orientar validações adequadas para diferentes tipos de aplicação.",
          action:
            "O checklist incluiu compatibilidade, responsividade, interface, funcionalidades offline e testes funcionais e não funcionais.",
          contribution:
            "Apoiou uma cobertura mais consistente e adequada ao contexto de cada solução."
        },
        {
          title: "APIs",
          need:
            "Estruturar práticas para validação de serviços e integrações.",
          action:
            "Foram incluídas verificações de Swagger, requisição, resposta, autenticação, autorização, códigos de retorno e contrato/schema.",
          contribution:
            "Ampliou consistência, profundidade e rastreabilidade nos testes de API."
        },
        {
          title: "Banco de Dados e Integração",
          need:
            "Orientar validações sobre dados, transações e comunicação entre componentes.",
          action:
            "O checklist reuniu schema, chaves, dados de teste, integridade, transações, serviços e tratamento de erros.",
          contribution:
            "Apoiou validações mais completas sobre consistência e comportamento das integrações."
        },
        {
          title: "Revisão de Código",
          need:
            "Incluir verificações técnicas complementares relacionadas ao comportamento da solução.",
          action:
            "Foram consideradas validações de camada de dados, execução de robôs, audits e logs.",
          contribution:
            "Aproximou Qualidade de aspectos técnicos relevantes para prevenção e diagnóstico."
        }
      ]
    }
  ];

  const tabsElement =
    document.querySelector("#culture-tabs");

  const titleElement =
    document.querySelector("#culture-title");

  const topicButtonsElement =
    document.querySelector("#culture-topic-buttons");

  const cardsElement =
    document.querySelector("#culture-cards");

  if (
    !tabsElement ||
    !titleElement ||
    !topicButtonsElement ||
    !cardsElement
  ) {
    return;
  }

  let selectedTabIndex = 0;
  let selectedTopicIndex = 0;

  function renderTabs() {
    tabsElement.innerHTML = cultureData
      .map(
        (item, index) => `
          <button
            class="culture-tab-button${index === selectedTabIndex ? " is-selected" : ""}"
            type="button"
            role="tab"
            aria-selected="${index === selectedTabIndex}"
            data-culture-tab="${index}"
          >
            ${item.title}
          </button>
        `
      )
      .join("");
  }

  function renderTopics() {
    const selectedTab = cultureData[selectedTabIndex];

    titleElement.textContent = selectedTab.title;

    topicButtonsElement.innerHTML = selectedTab.topics
      .map(
        (topic, index) => `
          <button
            class="culture-topic-button${index === selectedTopicIndex ? " is-selected" : ""}"
            type="button"
            data-culture-topic="${index}"
          >
            ${topic.title}
          </button>
        `
      )
      .join("");
  }

  function renderCards() {
    const topic =
      cultureData[selectedTabIndex].topics[selectedTopicIndex];

    cardsElement.innerHTML = `
      <article class="culture-info-card">
        <p>Necessidade</p>
        <span>${topic.need}</span>
      </article>

      <article class="culture-info-card">
        <p>Ação realizada</p>
        <span>${topic.action}</span>
      </article>

      <article class="culture-info-card culture-info-card-highlight">
        <p>Contribuição para a área</p>
        <span>${topic.contribution}</span>
      </article>
    `;
  }

  tabsElement.addEventListener("click", (event) => {
    const button =
      event.target.closest("[data-culture-tab]");

    if (!button) {
      return;
    }

    selectedTabIndex =
      Number(button.dataset.cultureTab);

    selectedTopicIndex = 0;

    renderTabs();
    renderTopics();
    renderCards();
  });

  topicButtonsElement.addEventListener("click", (event) => {
    const button =
      event.target.closest("[data-culture-topic]");

    if (!button) {
      return;
    }

    selectedTopicIndex =
      Number(button.dataset.cultureTopic);

    renderTopics();
    renderCards();
  });

  renderTabs();
  renderTopics();
  renderCards();
})();
