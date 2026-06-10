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
    "plannedByModule": "propertyFlowCrm",
    "referencesExisting": false,
    "module": {
      "horizontalModuleId": "notifications",
      "priority": "soon",
      "reason": "Os workflows de visita e qualificação de leads requerem lembretes de visitas agendadas e alertas de follow-up sugeridos pela IA conforme decisão aceita notificationModule.",
      "reusedOntologyRefs": [
        "NotificationTemplate",
        "NotificationDelivery",
        "NotificationPreference"
      ],
      "consumedByArtifacts": [
        "visitConfirmationWorkflow",
        "leadQualificationWorkflow",
        "followUpSuggestionAgent",
        "Visit",
        "Lead"
      ]
    }
  }
} as const;

export default notificationsModulePlan;
