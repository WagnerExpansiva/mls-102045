/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_1_external/Lead.defs.ts" enhancement="_blank"/>

export const LeadMdm = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmEntity",
  "artifactId": "Lead",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdmEntity",
    "entity": "Lead",
    "ownership": "mdmOwned",
    "generateTable": false,
    "moduleId": "propertyFlowCrm",
    "domainId": "lead",
    "domainTitle": "Lead/Cliente",
    "sourceOfTruth": "leadDetailPage e casos de uso de lead (createLeadUsecase, updateLeadStageUsecase, updateLeadNotesUsecase)",
    "governanceRules": [
      "ruleLeadTemperature",
      "ruleLeadStageTransition",
      "Dados de lead devem ser mantidos centralizados e referenciados por identificador único",
      "Movimentações no pipeline devem registrar histórico de alterações"
    ],
    "title": "Lead/Cliente",
    "description": "Pessoa interessada com dados de contato, notas, estágio e temperatura.",
    "fields": []
  }
} as const;

export default LeadMdm;
