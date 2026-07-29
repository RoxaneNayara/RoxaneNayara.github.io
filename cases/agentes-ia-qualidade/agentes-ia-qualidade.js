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

  const simulationData = [
    {
      title: "Avaliador de Qualidade",
      questions: [
        {
          title: "A regra está clara e testável?",
          input:
            "<p>Clientes antigos recebem desconto especial na renovação do plano.</p>",
          analysis:
            "<ul><li>Definir o que caracteriza um cliente antigo.</li><li>Informar o percentual ou valor do desconto.</li><li>Especificar planos elegíveis e possibilidade de acúmulo.</li><li>Definir a data usada no cálculo do tempo como cliente.</li><li>Explicitar se a aplicação é automática e como tratar falhas.</li></ul>",
          references:
            "<ul><li>Especificação verificável e critérios mensuráveis.</li><li>Adequação funcional e prevenção de ambiguidades.</li><li>Particionamento de equivalência e análise de valores-limite.</li><li>Rastreabilidade entre regra, critério e cenário de teste.</li></ul>",
          validation:
            "<p>Produto, negócio, desenvolvimento e QA devem confirmar as definições antes da implementação.</p>"
        },
        {
          title: "Quais riscos e cenários devem ser considerados?",
          input:
            "<p>O usuário pode alterar o endereço antes da confirmação do pedido.</p>",
          analysis:
            "<ul><li>Alteração antes e depois da confirmação.</li><li>Endereço incompleto, inválido ou fora da área atendida.</li><li>Recalcular frete, prazo e tributos quando aplicável.</li><li>Falha ao salvar e concorrência entre sessões.</li><li>Preservar histórico e garantir consistência do pedido.</li><li>Validar autorização para alterar dados do pedido.</li></ul>",
          references:
            "<ul><li>Análise baseada em risco.</li><li>Cenários positivos, negativos, alternativos e de exceção.</li><li>Confiabilidade, segurança, compatibilidade e integridade dos dados.</li><li>Técnicas de projeto de testes previstas na ISO/IEC/IEEE 29119-4 e difundidas pelo ISTQB.</li></ul>",
          validation:
            "<p>O time deve priorizar cenários conforme impacto, probabilidade, arquitetura e regras logísticas reais.</p>"
        },
        {
          title: "Que inconsistências existem na história?",
          input:
            "<p><strong>História:</strong> Como usuário, quero receber uma notificação quando meu pagamento for aprovado.</p><p><strong>Critério:</strong> A notificação deve ser enviada rapidamente após o pagamento.</p>",
          analysis:
            "<ul><li>“Rapidamente” não representa um prazo mensurável.</li><li>O canal e o conteúdo mínimo não foram definidos.</li><li>Não há comportamento para falha, reenvio ou duplicidade.</li><li>O evento que confirma a aprovação precisa ser identificado.</li><li>Processamentos assíncronos e rastreabilidade do envio não foram contemplados.</li></ul>",
          references:
            "<ul><li>Critérios objetivos, verificáveis e rastreáveis.</li><li>Adequação funcional, confiabilidade e proteção de dados.</li><li>Documentação de testes e evidências.</li><li>Shift-left e prevenção de defeitos.</li></ul>",
          validation:
            "<p>Produto e áreas responsáveis devem definir prazo, canal, evento, conteúdo, reenvio e registro da notificação.</p>"
        }
      ]
    },
    {
      title: "Avaliador de Código",
      questions: [
        {
          title: "O código apresenta riscos de manutenção?",
          input:
            "<pre><code>function calcularDesconto(cliente) {\n  if (cliente.tipo === \"premium\") {\n    return cliente.valor * 0.9;\n  }\n\n  if (cliente.tipo === \"premium\") {\n    return cliente.valor * 0.85;\n  }\n\n  return cliente.valor;\n}</code></pre>",
          analysis:
            "<ul><li>A segunda condição é duplicada e nunca será alcançada.</li><li>A regra de desconto está ambígua.</li><li>Os fatores numéricos 0.9 e 0.85 não expressam claramente a regra de desconto.</li><li>Não há validação de cliente, tipo ou valor.</li><li>Faltam testes para categorias válidas, desconhecidas e entradas inválidas.</li></ul>",
          references:
            "<ul><li>Legibilidade, consistência e manutenção.</li><li>Eliminação de código inalcançável e duplicado.</li><li>Nomes expressivos e regras explícitas.</li><li>Análise estática e cobertura de testes.</li></ul>",
          validation:
            "<p>Desenvolvimento e negócio devem confirmar a regra correta antes da refatoração.</p>"
        },
        {
          title: "O tratamento de erros está adequado?",
          input:
            "<pre><code>async function buscarPedido(id) {\n  const response = await fetch(`/pedidos/${id}`);\n  return response.json();\n}</code></pre>",
          analysis:
            "<ul><li>Não existe verificação de sucesso da resposta.</li><li>Falhas de rede e respostas inválidas não são tratadas.</li><li>O identificador não é validado.</li><li>Não há comportamento definido para pedido inexistente.</li><li>Caso sejam adicionados logs para diagnóstico, eles devem evitar tokens, dados pessoais e detalhes internos.</li></ul>",
          references:
            "<ul><li>Confiabilidade, segurança e capacidade de diagnóstico.</li><li>Tratamento explícito de erros e estados inesperados.</li><li>Validação de entradas e respostas.</li><li>Revisão segura de código e proteção de dados.</li></ul>",
          validation:
            "<p>O time técnico deve definir contratos, códigos esperados, política de logs, retentativas e experiência do usuário.</p>"
        },
        {
          title: "O código está testável e consistente?",
          input:
            "<pre><code>async function finalizarCompra() {\n  const totalElement = document.querySelector(\"#total\");\n  const total = totalElement?.innerText;\n\n  if (total > 0) {\n    enviarPedido(total);\n    alert(\"Compra concluída\");\n  }\n}</code></pre><p class=\"simulation-code-context\">Considere que enviarPedido() retorna uma Promise.</p>",
          analysis:
            "<ul><li>A função mistura interface, regra, integração e mensagem.</li><li>O valor obtido da interface é uma string e depende de conversão implícita, o que pode falhar com formatos monetários, conteúdo vazio ou texto inválido.</li><li>A mensagem de sucesso é exibida antes de a operação assíncrona ser concluída e sem verificar se o pedido foi aceito.</li><li>Elemento ausente, valor inválido e falhas de integração não são tratados adequadamente.</li><li>O acoplamento dificulta testes unitários e manutenção.</li></ul>",
          references:
            "<ul><li>Separação de responsabilidades e baixo acoplamento.</li><li>Legibilidade, testabilidade e manutenção.</li><li>Validação explícita de tipos e estados.</li><li>Testes de sucesso, falha e entradas inválidas.</li></ul>",
          validation:
            "<p>A refatoração deve respeitar a arquitetura, o padrão do projeto e o comportamento esperado do fluxo de compra.</p>"
        }
      ]
    }
  ];

  function setupAgentDemo() {
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
              class="ai-tab-button${
                index === selectedIndex
                  ? " is-selected"
                  : ""
              }"
              type="button"
              role="tab"
              aria-selected="${
                index === selectedIndex
              }"
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

        <article
          class="ai-info-card
            ai-info-card-highlight"
        >
          <p>Validação necessária</p>
          <span>${item.validation}</span>
        </article>
      `;
    }

    tabsElement.addEventListener(
      "click",
      (event) => {
        const button = event.target.closest(
          "[data-agent-index]"
        );

        if (!button) {
          return;
        }

        selectedIndex = Number(
          button.dataset.agentIndex
        );

        renderTabs();
        renderPanel();
      }
    );

    renderTabs();
    renderPanel();
  }

  function setupSimulationDemo() {
    const agentsElement =
      document.querySelector(
        "#simulation-agents"
      );

    const questionsElement =
      document.querySelector(
        "#simulation-questions"
      );

    const panelElement =
      document.querySelector(
        ".simulation-panel"
      );

    const selectedLabelElement =
      document.querySelector(
        ".simulation-selected-label"
      );

    const titleElement =
      document.querySelector(
        "#simulation-title"
      );

    const inputElement =
      document.querySelector(
        "#simulation-input"
      );

    const analysisElement =
      document.querySelector(
        "#simulation-analysis"
      );

    const referencesElement =
      document.querySelector(
        "#simulation-references"
      );

    const validationElement =
      document.querySelector(
        "#simulation-validation"
      );

    const responseGridElement =
      document.querySelector(
        ".simulation-response-grid"
      );

    if (
      !agentsElement ||
      !questionsElement ||
      !panelElement ||
      !selectedLabelElement ||
      !titleElement ||
      !inputElement ||
      !analysisElement ||
      !referencesElement ||
      !validationElement ||
      !responseGridElement
    ) {
      return;
    }

    const contextElement =
      document.createElement("div");

    contextElement.className =
      "simulation-mobile-context";

    selectedLabelElement.insertAdjacentElement(
      "beforebegin",
      contextElement
    );

    const controlsElement =
      document.createElement("div");

    controlsElement.className =
      "simulation-controls";

    controlsElement.setAttribute(
      "aria-label",
      "Navegação entre simulações"
    );

    responseGridElement.insertAdjacentElement(
      "afterend",
      controlsElement
    );

    let selectedAgentIndex = 0;
    let selectedQuestionIndex = 0;

    function renderAgents() {
      agentsElement.innerHTML = simulationData
        .map(
          (agent, index) => `
            <button
              class="simulation-agent-button${
                index === selectedAgentIndex
                  ? " is-selected"
                  : ""
              }"
              type="button"
              role="tab"
              aria-selected="${
                index === selectedAgentIndex
              }"
              data-simulation-agent="${index}"
            >
              ${agent.title}
            </button>
          `
        )
        .join("");
    }

    function renderQuestions() {
      const agent =
        simulationData[selectedAgentIndex];

      questionsElement.innerHTML =
        agent.questions
          .map(
            (question, index) => `
              <button
                class="simulation-question-button${
                  index === selectedQuestionIndex
                    ? " is-selected"
                    : ""
                }"
                type="button"
                aria-pressed="${
                  index === selectedQuestionIndex
                }"
                data-simulation-question="${index}"
              >
                ${question.title}
              </button>
            `
          )
          .join("");
    }

    function renderPanel() {
      const item =
        simulationData[selectedAgentIndex]
          .questions[selectedQuestionIndex];

      titleElement.textContent =
        item.title;

      inputElement.innerHTML =
        item.input;

      analysisElement.innerHTML =
        item.analysis;

      referencesElement.innerHTML =
        item.references;

      validationElement.innerHTML =
        item.validation;
    }

    function renderContext() {
      const agent =
        simulationData[selectedAgentIndex];

      contextElement.innerHTML = `
        <p>Agente selecionado</p>
        <strong>${agent.title}</strong>

        <span>
          Simulação
          ${selectedQuestionIndex + 1}
          de ${agent.questions.length}
        </span>
      `;
    }

    function isFirstSimulation() {
      return (
        selectedAgentIndex === 0 &&
        selectedQuestionIndex === 0
      );
    }

    function isLastSimulation() {
      const lastAgentIndex =
        simulationData.length - 1;

      const lastQuestionIndex =
        simulationData[lastAgentIndex]
          .questions.length - 1;

      return (
        selectedAgentIndex ===
          lastAgentIndex &&
        selectedQuestionIndex ===
          lastQuestionIndex
      );
    }

    function renderControls() {
      const agent =
        simulationData[selectedAgentIndex];

      controlsElement.innerHTML = `
        <button
          class="simulation-control-button"
          type="button"
          data-simulation-direction="previous"
          ${
            isFirstSimulation()
              ? "disabled"
              : ""
          }
        >
          ← Anterior
        </button>

        <span class="simulation-control-status">
          ${agent.title}
          ·
          ${selectedQuestionIndex + 1}
          de ${agent.questions.length}
        </span>

        <button
          class="simulation-control-button"
          type="button"
          data-simulation-direction="next"
          ${
            isLastSimulation()
              ? "disabled"
              : ""
          }
        >
          Próxima →
        </button>
      `;
    }

    function render() {
      renderAgents();
      renderQuestions();
      renderPanel();
      renderContext();
      renderControls();
    }

    function moveToPreviousSimulation() {
      if (selectedQuestionIndex > 0) {
        selectedQuestionIndex -= 1;
        return true;
      }

      if (selectedAgentIndex > 0) {
        selectedAgentIndex -= 1;

        const previousAgent =
          simulationData[selectedAgentIndex];

        selectedQuestionIndex =
          previousAgent.questions.length - 1;

        return true;
      }

      return false;
    }

    function moveToNextSimulation() {
      const currentAgent =
        simulationData[selectedAgentIndex];

      if (
        selectedQuestionIndex <
        currentAgent.questions.length - 1
      ) {
        selectedQuestionIndex += 1;
        return true;
      }

      if (
        selectedAgentIndex <
        simulationData.length - 1
      ) {
        selectedAgentIndex += 1;
        selectedQuestionIndex = 0;
        return true;
      }

      return false;
    }

    function scrollToSimulationPanel() {
      if (
        !window.matchMedia(
          "(max-width: 1024px)"
        ).matches
      ) {
        return;
      }

      const header =
        document.querySelector(".header");

      const caseNavigation =
        document.querySelector(
          ".case-navigation"
        );

      const offset =
        (header?.offsetHeight ?? 76) +
        (caseNavigation?.offsetHeight ?? 0) +
        20;

      const top =
        panelElement
          .getBoundingClientRect()
          .top +
        window.scrollY -
        offset;

      const reducedMotion =
        window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

      window.scrollTo({
        top,
        behavior: reducedMotion
          ? "auto"
          : "smooth"
      });
    }

    agentsElement.addEventListener(
      "click",
      (event) => {
        const button = event.target.closest(
          "[data-simulation-agent]"
        );

        if (!button) {
          return;
        }

        selectedAgentIndex = Number(
          button.dataset.simulationAgent
        );

        selectedQuestionIndex = 0;
        render();
      }
    );

    questionsElement.addEventListener(
      "click",
      (event) => {
        const button = event.target.closest(
          "[data-simulation-question]"
        );

        if (!button) {
          return;
        }

        selectedQuestionIndex = Number(
          button.dataset
            .simulationQuestion
        );

        render();
      }
    );

    controlsElement.addEventListener(
      "click",
      (event) => {
        const button = event.target.closest(
          "[data-simulation-direction]"
        );

        if (!button || button.disabled) {
          return;
        }

        const moved =
          button.dataset
            .simulationDirection ===
          "next"
            ? moveToNextSimulation()
            : moveToPreviousSimulation();

        if (!moved) {
          return;
        }

        render();

        requestAnimationFrame(() => {
          scrollToSimulationPanel();
        });
      }
    );

    render();
  }

  setupAgentDemo();
  setupSimulationDemo();
})();
