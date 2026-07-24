const qualityFlow = document.querySelector("#quality-flow");
const qualitySteps = Array.from(
  document.querySelectorAll(".quality-step")
);

const qualityPreviousButton =
  document.querySelector("#quality-previous");

const qualityNextButton =
  document.querySelector("#quality-next");

const qualityPanelNumber =
  document.querySelector("#quality-panel-number");

const qualityPanelStatus =
  document.querySelector("#quality-panel-status");

const qualityPanelTitle =
  document.querySelector("#quality-panel-title");

const qualityPanelDescription =
  document.querySelector("#quality-panel-description");

const qualityPanelObjective =
  document.querySelector("#quality-panel-objective");

const qualityPanelParticipants =
  document.querySelector("#quality-panel-participants");

const qualityPanelCriteria =
  document.querySelector("#quality-panel-criteria");

const qualityPanelEvidence =
  document.querySelector("#quality-panel-evidence");

const qualityPanelRisk =
  document.querySelector("#quality-panel-risk");

const qualityPanelValue =
  document.querySelector("#quality-panel-value");

const qualityStepData = {
  preparacao: {
    number: "Etapa 01",
    status: "Critério de entrada",
    title: "Preparação da demanda",
    description:
      "Produto organiza as informações necessárias para que a demanda possa ser analisada pelo time.",
    objective:
      "Garantir que a demanda possua contexto, regras e condições mínimas antes do refinamento.",
    participants:
      "Produto como responsável principal, com apoio de QA e Desenvolvimento quando necessário.",
    criteria: [
      "Contexto e objetivo da demanda definidos.",
      "Regras de negócio registradas.",
      "Critérios de aceite claros.",
      "Pré-requisitos para testes identificados.",
      "Dados, anexos e referências disponibilizados."
    ],
    evidence:
      "Product Backlog Item preenchido, critérios registrados e insumos vinculados.",
    risk:
      "Refinamento iniciado com informações incompletas ou condições de teste indefinidas.",
    value:
      "A qualidade começa na preparação da demanda, antes de qualquer implementação."
  },

  refinamento: {
    number: "Etapa 02",
    status: "Critério colaborativo",
    title: "Refinamento colaborativo",
    description:
      "Produto, QA e Desenvolvimento analisam conjuntamente entendimento, viabilidade, testabilidade e riscos.",
    objective:
      "Construir um entendimento compartilhado sobre o que será desenvolvido e como a entrega poderá ser validada.",
    participants:
      "Produto, QA e Desenvolvimento, com responsabilidades complementares durante o refinamento.",
    criteria: [
      "História, regras e critérios de aceite revisados.",
      "Testabilidade da demanda avaliada.",
      "Pré-requisitos internos e externos revisados.",
      "Viabilidade técnica analisada.",
      "Dependências, riscos e impactos identificados.",
      "Alinhamento realizado entre os participantes."
    ],
    evidence:
      "Informações revisadas no backlog, decisões registradas e critérios aceitos pelo time.",
    risk:
      "Dúvidas funcionais ou técnicas descobertas apenas durante o desenvolvimento ou os testes.",
    value:
      "Antecipa riscos, melhora a testabilidade e distribui a responsabilidade pela qualidade."
  },

  execucao: {
    number: "Etapa 03",
    status: "Critério de execução",
    title: "Execução comprometida",
    description:
      "Desenvolvimento e QA colaboram durante a construção, com testes do desenvolvedor, pair testing e testes de QA no ambiente de desenvolvimento, além da documentação dos resultados.",
    objective:
      "Validar a implementação ainda no ambiente de desenvolvimento, combinando testes técnicos, validações colaborativas e testes formais de QA com documentação dos resultados.",
    participants:
      "Desenvolvimento como responsável pela construção da solução, com apoio de QA nas validações em desenvolvimento e documentação dos testes.",
    criteria: [
      "Implementação realizada conforme os critérios definidos.",
      "Testes do desenvolvedor executados.",
      "Pair testing realizado quando aplicável.",
      "Testes de QA executados no ambiente de desenvolvimento.",
      "Resultados dos testes documentados.",
      "Evidências da validação registradas.",
      "Problemas identificados comunicados e tratados.",
      "Correções aplicáveis validadas ainda em desenvolvimento."
    ],
    evidence:
      "Resultados dos testes do desenvolvedor, registros do pair testing, documentação de QA em desenvolvimento, evidências funcionais e técnicas produzidas durante a execução.",
    risk:
      "A entrega avançar sem validação suficiente em desenvolvimento, sem documentação dos testes ou com falhas descobertas apenas em etapas posteriores.",
    value:
      "Antecipa defeitos, fortalece a colaboração entre Desenvolvimento e QA e mantém rastreabilidade das validações realizadas durante a construção."
  },

  revisao: {
    number: "Etapa 04",
    status: "Critério de saída",
    title: "Revisão e validação",
    description:
      "Após a revisão técnica, o item passa por smoke tests e documentação no ambiente de homologação.",
    objective:
      "Confirmar o funcionamento da entrega no ambiente de homologação antes de sua liberação para os testes do solicitante.",
    participants:
      "Desenvolvimento e QA, com participação de Produto nos aceites e validações aplicáveis.",
    criteria: [
      "Desenvolvimento concluído.",
      "Code review e pull request realizados.",
      "Validações no ambiente de desenvolvimento concluídas.",
      "Smoke tests executados no ambiente de homologação.",
      "Resultados e evidências da homologação documentados.",
      "Critérios de aceite avaliados.",
      "Bugs aplicáveis corrigidos e retestados.",
      "Informações necessárias para a liberação registradas."
    ],
    evidence:
      "Resultados dos smoke tests, documentação de QA, evidências funcionais, registros de correções e informações de liberação.",
    risk:
      "O solicitante receber uma entrega sem validação mínima no ambiente de homologação ou sem evidências suficientes.",
    value:
      "Confirma a estabilidade básica da entrega em homologação e estabelece uma liberação controlada para o solicitante."
  }
};

function getSelectedQualityStepIndex() {
  return qualitySteps.findIndex((step) =>
    step.classList.contains("is-selected")
  );
}

function updateQualityNavigationButtons(index) {
  if (!qualityPreviousButton || !qualityNextButton) {
    return;
  }

  qualityPreviousButton.disabled = index === 0;
  qualityNextButton.disabled = index === qualitySteps.length - 1;
}

function updateQualityCriteria(criteria) {
  if (!qualityPanelCriteria) {
    return;
  }

  qualityPanelCriteria.innerHTML = "";

  criteria.forEach((criterion) => {
    const listItem = document.createElement("li");
    listItem.textContent = criterion;
    qualityPanelCriteria.appendChild(listItem);
  });
}

function centerQualityStep(step) {
  if (!qualityFlow || !step) {
    return;
  }

  const flowRectangle = qualityFlow.getBoundingClientRect();
  const stepRectangle = step.getBoundingClientRect();

  const currentScroll = qualityFlow.scrollLeft;

  const targetScroll =
    currentScroll +
    stepRectangle.left -
    flowRectangle.left -
    (flowRectangle.width - stepRectangle.width) / 2;

  qualityFlow.scrollTo({
    left: targetScroll,
    behavior: "smooth"
  });
}

function selectQualityStep(step, shouldFocus = false) {
  if (!step) {
    return;
  }

  const stepKey = step.dataset.step;
  const data = qualityStepData[stepKey];

  if (!data) {
    return;
  }

  qualitySteps.forEach((currentStep) => {
    const isSelected = currentStep === step;

    currentStep.classList.toggle("is-selected", isSelected);
    currentStep.setAttribute(
      "aria-pressed",
      String(isSelected)
    );
  });

  qualityPanelNumber.textContent = data.number;
  qualityPanelStatus.textContent = data.status;
  qualityPanelTitle.textContent = data.title;
  qualityPanelDescription.textContent = data.description;
  qualityPanelObjective.textContent = data.objective;
  qualityPanelParticipants.textContent = data.participants;
  qualityPanelEvidence.textContent = data.evidence;
  qualityPanelRisk.textContent = data.risk;
  qualityPanelValue.textContent = data.value;

  updateQualityCriteria(data.criteria);

  const selectedIndex = qualitySteps.indexOf(step);

  updateQualityNavigationButtons(selectedIndex);
  centerQualityStep(step);

  if (shouldFocus) {
    step.focus();
  }
}

function selectQualityStepByIndex(index, shouldFocus = false) {
  if (index < 0 || index >= qualitySteps.length) {
    return;
  }

  selectQualityStep(qualitySteps[index], shouldFocus);
}

qualitySteps.forEach((step, index) => {
  step.addEventListener("click", () => {
    selectQualityStep(step);
  });

  step.addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectQualityStepByIndex(index + 1, true);
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectQualityStepByIndex(index - 1, true);
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectQualityStepByIndex(0, true);
    }

    if (event.key === "End") {
      event.preventDefault();
      selectQualityStepByIndex(
        qualitySteps.length - 1,
        true
      );
    }
  });
});

if (qualityPreviousButton) {
  qualityPreviousButton.addEventListener("click", () => {
    const selectedIndex = getSelectedQualityStepIndex();

    selectQualityStepByIndex(selectedIndex - 1);
  });
}

if (qualityNextButton) {
  qualityNextButton.addEventListener("click", () => {
    const selectedIndex = getSelectedQualityStepIndex();

    selectQualityStepByIndex(selectedIndex + 1);
  });
}

function resetQualityFlow() {
  selectQualityStepByIndex(0);
}

window.addEventListener("pageshow", resetQualityFlow);

resetQualityFlow();
