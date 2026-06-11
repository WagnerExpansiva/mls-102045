/// <mls fileReference="_102045_/l5/notifications/module.defs.ts" enhancement="_blank"/>

export const notificationsModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "horizontalModule",
  "artifactId": "notifications",
  "moduleName": "notifications",
  "status": "draft",
  "source": {
    "agentName": "agentPlanHorizontals",
    "stepId": 13,
    "planId": "plan-horizontals"
  },
  "data": {
    "kind": "horizontal",
    "moduleId": "notifications",
    "horizontalModuleId": "notifications",
    "plannedByModule": "manterPropertyFlowCrm",
    "referencesExisting": false,
    "module": {
      "horizontalModuleId": "notifications",
      "priority": "soon",
      "reason": "O plano aprova o notificationsModule com prioridade 'soon' para alertas in-app sobre visitas agendadas, mudanças de etapa de lead/negócio e lembretes de follow-up. Os workflows leadStageTransitionWorkflow, visitLifecycleWorkflow e dealStageWorkflow são consumidores diretos. O canal exato (in-app, e-mail ou push) está pendente de decisão do cliente, o que justifica manter a prioridade 'soon' em vez de 'now'.",
      "reusedOntologyRefs": [
        "NotificationTemplate",
        "NotificationDelivery",
        "NotificationPreference"
      ],
      "consumedByArtifacts": [
        "leadStageTransitionWorkflow",
        "visitLifecycleWorkflow",
        "dealStageWorkflow"
      ]
    }
  }
} as const;

export default notificationsModulePlan;
