/// <mls fileReference="_102045_/l5/finance/module.defs.ts" enhancement="_blank"/>

export const financeModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "horizontalModule",
  "artifactId": "finance",
  "moduleName": "finance",
  "status": "draft",
  "source": {
    "agentName": "agentPlanHorizontals",
    "stepId": 13,
    "planId": "plan-horizontals"
  },
  "data": {
    "kind": "horizontal",
    "moduleId": "finance",
    "horizontalModuleId": "finance",
    "plannedByModule": "manterPropertyFlowCrm",
    "referencesExisting": false,
    "module": {
      "horizontalModuleId": "finance",
      "priority": "never",
      "reason": "O escopo aprovado não inclui billing, pagamentos, recebíveis, cobranças, faturas, reembolsos ou reconciliação financeira. O campo dealValue representa o valor de uma proposta imobiliária para fins de rastreamento de pipeline, não uma transação financeira processada pelo sistema. Nenhuma capability, artefato ou decisão de implementação cobre funcionalidades financeiras.",
      "reusedOntologyRefs": [],
      "consumedByArtifacts": []
    }
  }
} as const;

export default financeModulePlan;
