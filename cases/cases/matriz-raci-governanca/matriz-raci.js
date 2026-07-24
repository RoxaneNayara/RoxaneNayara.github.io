(() => {
  const raciData = [
    {
      id: "preparacao",
      label: "Preparação e refinamento",
      activities: [
        {
          title: "Preparar e revisar a demanda",
          roles: {
            R: ["Produto"],
            A: ["Produto"],
            C: ["Qualidade", "Liderança técnica"],
            I: ["Desenvolvimento", "Solicitante"],
          },
          contribution:
            "Organiza contexto, regras de negócio, critérios de aceite e referências necessárias para o avanço da demanda.",
        },
        {
          title: "Conduzir o refinamento colaborativo",
          roles: {
            R: [
              "Produto",
              "Qualidade",
              "Desenvolvimento",
              "Liderança técnica",
            ],
            A: ["Produto"],
            C: ["Solicitante, quando necessário"],
            I: ["Participantes relacionados à entrega"],
          },
          contribution:
            "Constrói compreensão compartilhada sobre escopo, regras, critérios de aceite, riscos e impactos técnicos.",
        },
        {
          title: "Avaliar riscos, dependências e viabilidade",
          roles: {
            R: [
              "Produto",
              "Qualidade",
              "Desenvolvimento",
              "Liderança técnica",
            ],
            A: [],
            C: ["Solicitante, conforme o contexto"],
            I: ["Participantes impactados"],
          },
          contribution:
            "Antecipa impedimentos, dependências técnicas, necessidades de acesso e condições necessárias para a execução.",
          note:
            "A matriz original não atribui uma autoridade única a esta atividade. A decisão depende da natureza do risco ou da dependência analisada.",
        },
      ],
    },
    {
      id: "planejamento",
      label: "Planejamento da entrega",
      activities: [
        {
          title: "Planejar e estimar as atividades da sprint",
          roles: {
            R: [
              "Produto",
              "Liderança técnica",
              "Qualidade",
              "Desenvolvimento",
            ],
            A: ["Produto, quanto à priorização"],
            C: ["Qualidade", "Desenvolvimento"],
            I: ["Solicitante"],
          },
          contribution:
            "Alinha capacidade, prioridades, esforço e condições para que as atividades sejam assumidas com clareza.",
        },
        {
          title: "Planejar os testes da entrega",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Produto", "Liderança técnica", "Desenvolvimento"],
            I: ["Participantes envolvidos na entrega"],
          },
          contribution:
            "Define esforço, abordagem, atividades, registros e necessidades para a validação da entrega.",
        },
        {
          title: "Preparar dados, acessos e ambientes de teste",
          roles: {
            R: ["Papéis definidos conforme o tipo de insumo"],
            A: [],
            C: [
              "Produto",
              "Liderança técnica",
              "Qualidade",
              "Desenvolvimento",
            ],
            I: ["Participantes dependentes dos insumos"],
          },
          contribution:
            "Garante que dados, acessos, ambientes e demais pré-requisitos estejam disponíveis antes da execução dos testes.",
          note:
            "A matriz original não atribui uma autoridade única. A responsabilidade varia conforme o tipo de dado, acesso, ambiente ou dependência necessária.",
        },
      ],
    },
    {
      id: "desenvolvimento",
      label: "Desenvolvimento e testes",
      activities: [
        {
          title: "Antecipar testes durante o desenvolvimento",
          roles: {
            R: ["Qualidade", "Desenvolvimento"],
            A: ["Qualidade, quanto à validação"],
            C: ["Liderança técnica", "Produto, quando necessário"],
            I: ["Participantes relacionados à entrega"],
          },
          contribution:
            "Permite identificar inconsistências antes da entrega formal para testes e reduz descobertas tardias.",
        },
        {
          title: "Realizar pair testing",
          roles: {
            R: ["Qualidade", "Desenvolvimento"],
            A: ["Qualidade"],
            C: ["Produto", "Liderança técnica"],
            I: ["Participantes envolvidos na entrega"],
          },
          contribution:
            "Promove colaboração direta, compartilhamento de conhecimento e identificação antecipada de problemas.",
        },
        {
          title: "Executar testes e registrar evidências",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Desenvolvimento", "Liderança técnica"],
            I: ["Produto", "Participantes da entrega"],
          },
          contribution:
            "Valida o comportamento da solução e registra resultados para apoiar a decisão de avanço.",
        },
        {
          title: "Registrar a inconsistência",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Desenvolvimento", "Liderança técnica"],
            I: ["Produto"],
          },
          contribution:
            "Formaliza o problema encontrado e mantém rastreabilidade sobre contexto, evidências e impacto.",
        },
        {
          title: "Corrigir a inconsistência",
          roles: {
            R: ["Desenvolvimento"],
            A: ["Liderança técnica"],
            C: ["Qualidade"],
            I: ["Produto"],
          },
          contribution:
            "Direciona a correção para o papel responsável pela implementação, com apoio da análise técnica e de qualidade.",
        },
        {
          title: "Retestar e validar a correção",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Desenvolvimento", "Liderança técnica"],
            I: ["Produto"],
          },
          contribution:
            "Confirma a correção, atualiza as evidências e sustenta a decisão sobre a continuidade da entrega.",
        },
      ],
    },
    {
      id: "revisao",
      label: "Revisão e homologação",
      activities: [
        {
          title: "Realizar smoke test em homologação",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Desenvolvimento", "Liderança técnica"],
            I: ["Produto", "Solicitante"],
          },
          contribution:
            "Confirma a estabilidade inicial da entrega no ambiente de homologação antes da validação de negócio.",
        },
        {
          title: "Validar inconsistências e retestar correções",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Desenvolvimento", "Liderança técnica"],
            I: ["Produto", "Solicitante"],
          },
          contribution:
            "Verifica ocorrências identificadas, acompanha ajustes e registra evidências pós-correção.",
        },
        {
          title: "Liberar para homologação pelo solicitante",
          roles: {
            R: ["Qualidade", "Produto"],
            A: [
              "Qualidade, quanto aos testes",
              "Produto, quanto ao avanço do fluxo",
            ],
            C: ["Liderança técnica", "Desenvolvimento"],
            I: ["Solicitante"],
          },
          contribution:
            "Formaliza que a validação técnica foi concluída e que a entrega está disponível para a homologação de negócio.",
        },
      ],
    },
    {
      id: "governanca",
      label: "Governança de Qualidade",
      activities: [
        {
          title: "Analisar processos pela perspectiva de qualidade",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Produto", "Liderança técnica", "Desenvolvimento"],
            I: ["Participantes impactados"],
          },
          contribution:
            "Identifica riscos, inconsistências de processo e oportunidades de melhoria ao longo do fluxo.",
        },
        {
          title: "Criar e revisar documentações de qualidade",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Produto", "Liderança técnica"],
            I: ["Desenvolvimento"],
          },
          contribution:
            "Mantém critérios, práticas e orientações documentados para consulta e aplicação compartilhada.",
        },
        {
          title: "Padronizar práticas de qualidade",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Produto", "Liderança técnica"],
            I: ["Desenvolvimento"],
          },
          contribution:
            "Cria referências comuns para reduzir variações e aumentar a consistência das atividades.",
        },
        {
          title: "Definir estratégias de qualidade",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Produto", "Liderança técnica"],
            I: ["Desenvolvimento"],
          },
          contribution:
            "Direciona prioridades, abordagens e práticas de qualidade conforme os objetivos e riscos do processo.",
        },
        {
          title: "Acompanhar métricas de qualidade",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Produto", "Liderança técnica"],
            I: ["Participantes impactados"],
          },
          contribution:
            "Apoia o acompanhamento do processo e a identificação de tendências e necessidades de ajuste.",
        },
        {
          title: "Orientar o time e apoiar a melhoria contínua",
          roles: {
            R: ["Qualidade"],
            A: ["Qualidade"],
            C: ["Produto", "Liderança técnica", "Desenvolvimento"],
            I: ["Participantes impactados"],
          },
          contribution:
            "Fortalece a aplicação das práticas e amplia a compreensão compartilhada sobre qualidade.",
        },
      ],
    },
  ];

  const roleLabels = {
    R: "Responsável",
    A: "Autoridade de decisão",
    C: "Consultado",
    I: "Informado",
  };

  const areasElement = document.querySelector("#raci-areas");
  const activitiesElement = document.querySelector("#raci-activities");
  const titleElement = document.querySelector("#raci-activity-title");
  const cardsElement = document.querySelector("#raci-cards");
  const contributionElement = document.querySelector("#raci-contribution");
  const noteElement = document.querySelector("#raci-note");
  const noteTextElement = document.querySelector("#raci-note-text");

  if (
    !areasElement ||
    !activitiesElement ||
    !titleElement ||
    !cardsElement ||
    !contributionElement ||
    !noteElement ||
    !noteTextElement
  ) {
    return;
  }

  let selectedAreaIndex = 0;
  let selectedActivityIndex = 0;

  function renderAreas() {
    areasElement.innerHTML = raciData
      .map(
        (area, index) => `
          <button
            class="raci-area-button${
              index === selectedAreaIndex ? " is-selected" : ""
            }"
            type="button"
            role="tab"
            aria-selected="${index === selectedAreaIndex}"
            data-area-index="${index}"
          >
            ${area.label}
          </button>
        `,
      )
      .join("");
  }

  function renderActivities() {
    const currentArea = raciData[selectedAreaIndex];

    activitiesElement.innerHTML = currentArea.activities
      .map(
        (activity, index) => `
          <button
            class="raci-activity-button${
              index === selectedActivityIndex ? " is-selected" : ""
            }"
            type="button"
            data-activity-index="${index}"
          >
            ${activity.title}
          </button>
        `,
      )
      .join("");
  }

  function renderDetail() {
    const activity =
      raciData[selectedAreaIndex].activities[selectedActivityIndex];

    titleElement.textContent = activity.title;
    contributionElement.textContent = activity.contribution;

    cardsElement.innerHTML = ["R", "A", "C", "I"]
      .map((role) => {
        const values = activity.roles[role];

        const content =
          values.length > 0
            ? `
              <ul>
                ${values.map((value) => `<li>${value}</li>`).join("")}
              </ul>
            `
            : `
              <p class="raci-empty">
                Não atribuído na matriz consolidada
              </p>
            `;

        return `
          <section class="raci-card raci-card-${role.toLowerCase()}">
            <div class="raci-card-heading">
              <span class="raci-letter">${role}</span>
              <h4>${roleLabels[role]}</h4>
            </div>

            ${content}
          </section>
        `;
      })
      .join("");

    if (activity.note) {
      noteTextElement.textContent = activity.note;
      noteElement.hidden = false;
    } else {
      noteTextElement.textContent = "";
      noteElement.hidden = true;
    }
  }

  function render() {
    renderAreas();
    renderActivities();
    renderDetail();
  }

  areasElement.addEventListener("click", (event) => {
    const button = event.target.closest("[data-area-index]");

    if (!button) {
      return;
    }

    selectedAreaIndex = Number(button.dataset.areaIndex);
    selectedActivityIndex = 0;

    render();
  });

  activitiesElement.addEventListener("click", (event) => {
    const button = event.target.closest("[data-activity-index]");

    if (!button) {
      return;
    }

    selectedActivityIndex = Number(button.dataset.activityIndex);

    render();
  });

  render();
})();
