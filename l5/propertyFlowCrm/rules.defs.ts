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
        "ruleId": "rulePropertyStatus",
        "title": "Status do imóvel",
        "description": "Imóvel deve ter status entre disponível, reservado, vendido ou inativo.",
        "appliesTo": [
          "Property"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "ruleLeadTemperature",
        "title": "Temperatura do lead",
        "description": "Lead deve ter temperatura quente, morno ou frio.",
        "appliesTo": [
          "Lead"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "ruleLeadStageTransition",
        "title": "Transição de estágio do lead",
        "description": "Movimentação no kanban registra histórico e atualiza estágio atual.",
        "appliesTo": [
          "Lead"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "ruleVisitRequiresLinks",
        "title": "Visita vinculada",
        "description": "Visita deve estar vinculada a um Lead e a um Imóvel.",
        "appliesTo": [
          "Visit"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "ruleDealRequiresProperty",
        "title": "Negócio vinculado a imóvel",
        "description": "Negócio deve estar associado a um Imóvel e um Lead.",
        "appliesTo": [
          "Deal"
        ],
        "layer": "layer_1"
      },
      {
        "ruleId": "ruleDealStageTransition",
        "title": "Transição de etapa do negócio",
        "description": "Atualização de etapa do negócio registra histórico e valor vigente.",
        "appliesTo": [
          "Deal"
        ],
        "layer": "layer_3"
      },
      {
        "ruleId": "ruleBrokerPermissions",
        "title": "Permissões por papel",
        "description": "Corretor gerencia imóveis, leads, visitas e negócios; gestor visualiza métricas e dashboards.",
        "appliesTo": [
          "Broker"
        ],
        "layer": "layer_2"
      }
    ]
  }
} as const;

export default rulesPlan;
