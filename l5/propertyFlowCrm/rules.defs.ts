/// <mls fileReference="_102045_/l5/propertyFlowCrm/rules.defs.ts" enhancement="_blank"/>

export const rulesPlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "rules",
  "artifactId": "propertyFlowCrmRules",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentFinalizeSolutionPlan",
    "stepId": 11,
    "planId": "plan-finalize-solution-plan"
  },
  "data": {
    "moduleName": "propertyFlowCrm",
    "rules": [
      {
        "ruleId": "rulePropertyRequiredFields",
        "title": "Campos Obrigatórios de Imóvel",
        "description": "Todo imóvel deve ter título, tipo, tipo de transação, preço, status e endereço completo (logradouro, bairro, cidade, estado).",
        "appliesTo": [
          "Property"
        ],
        "layer": "validation"
      },
      {
        "ruleId": "rulePropertyStatusTransition",
        "title": "Transição de Status de Imóvel",
        "description": "Imóveis só podem transicionar de status seguindo o fluxo: draft → published → (sold|rented|reserved|archived). Imóveis vendidos ou alugados não podem voltar a ativo.",
        "appliesTo": [
          "Property"
        ],
        "layer": "workflow"
      },
      {
        "ruleId": "ruleLeadRequiredFields",
        "title": "Campos Obrigatórios de Lead",
        "description": "Todo lead deve ter nome completo, telefone e corretor responsável atribuído.",
        "appliesTo": [
          "Lead"
        ],
        "layer": "validation"
      },
      {
        "ruleId": "ruleLeadPipelineTransition",
        "title": "Transição de Pipeline de Lead",
        "description": "Leads devem seguir o fluxo do pipeline: new → contacted → qualified → negotiating → (converted|lost). Não é permitido pular etapas.",
        "appliesTo": [
          "Lead"
        ],
        "layer": "workflow"
      },
      {
        "ruleId": "ruleVisitRequiredFields",
        "title": "Campos Obrigatórios de Visita",
        "description": "Toda visita deve ter lead, imóvel, corretor e data/hora agendada.",
        "appliesTo": [
          "Visit"
        ],
        "layer": "validation"
      },
      {
        "ruleId": "ruleVisitStatusTransition",
        "title": "Transição de Status de Visita",
        "description": "Visitas seguem o fluxo: scheduled → confirmed → (completed|cancelled|noShow). Visitas canceladas ou não comparecidas não podem ser reativadas.",
        "appliesTo": [
          "Visit"
        ],
        "layer": "workflow"
      },
      {
        "ruleId": "ruleDealRequiredFields",
        "title": "Campos Obrigatórios de Negócio",
        "description": "Todo negócio deve ter lead, imóvel, corretor, tipo de negócio e valor proposto.",
        "appliesTo": [
          "Deal"
        ],
        "layer": "validation"
      },
      {
        "ruleId": "ruleDealPipelineTransition",
        "title": "Transição de Pipeline de Negócio",
        "description": "Negócios seguem o fluxo: proposal → negotiation → documentation → closing → (won|lost). Negócios fechados (ganhos ou perdidos) não podem ser reabertos.",
        "appliesTo": [
          "Deal"
        ],
        "layer": "workflow"
      },
      {
        "ruleId": "ruleBrokerRequiredFields",
        "title": "Campos Obrigatórios de Corretor",
        "description": "Todo corretor deve ter nome completo, e-mail, telefone e perfil de acesso definido.",
        "appliesTo": [
          "Broker"
        ],
        "layer": "validation"
      },
      {
        "ruleId": "ruleInteractionRequiredFields",
        "title": "Campos Obrigatórios de Interação",
        "description": "Toda interação deve ter lead, corretor, tipo, direção, resumo e data/hora.",
        "appliesTo": [
          "LeadInteraction"
        ],
        "layer": "validation"
      },
      {
        "ruleId": "ruleBrokerAssignment",
        "title": "Atribuição de Corretor",
        "description": "Leads, visitas e negócios devem sempre ter um corretor ativo atribuído como responsável.",
        "appliesTo": [
          "Lead",
          "Visit",
          "Deal"
        ],
        "layer": "business"
      },
      {
        "ruleId": "ruleVisitPropertyActive",
        "title": "Visita em Imóvel Ativo",
        "description": "Visitas só podem ser agendadas para imóveis com status ativo ou reservado.",
        "appliesTo": [
          "Visit"
        ],
        "layer": "business"
      },
      {
        "ruleId": "ruleDealPropertyActive",
        "title": "Negócio em Imóvel Disponível",
        "description": "Negócios só podem ser criados para imóveis com status ativo ou reservado.",
        "appliesTo": [
          "Deal"
        ],
        "layer": "business"
      }
    ]
  }
} as const;

export default rulesPlan;
