/// <mls fileReference="_102045_/l5/documents/module.defs.ts" enhancement="_blank"/>

export const documentsModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "horizontalModule",
  "artifactId": "documents",
  "moduleName": "documents",
  "status": "draft",
  "source": {
    "agentName": "agentPlanHorizontals",
    "stepId": 13,
    "planId": "plan-horizontals"
  },
  "data": {
    "kind": "horizontal",
    "moduleId": "documents",
    "horizontalModuleId": "documents",
    "plannedByModule": "manterPropertyFlowCrm",
    "referencesExisting": false,
    "module": {
      "horizontalModuleId": "documents",
      "priority": "never",
      "reason": "O escopo aprovado não inclui contratos, assinaturas digitais, certificados, apólices ou geração de documentos formais. O funil de negócios possui etapa 'contrato', mas nenhuma capability, artefato ou decisão de implementação cobre geração ou assinatura de documentos. Não há justificativa para incluir este horizontal no plano atual.",
      "reusedOntologyRefs": [],
      "consumedByArtifacts": []
    }
  }
} as const;

export default documentsModulePlan;
