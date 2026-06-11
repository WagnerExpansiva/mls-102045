/// <mls fileReference="_102045_/l5/i18n/module.defs.ts" enhancement="_blank"/>

export const i18nModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "horizontalModule",
  "artifactId": "i18n",
  "moduleName": "i18n",
  "status": "draft",
  "source": {
    "agentName": "agentPlanHorizontals",
    "stepId": 13,
    "planId": "plan-horizontals"
  },
  "data": {
    "kind": "horizontal",
    "moduleId": "i18n",
    "horizontalModuleId": "i18n",
    "plannedByModule": "manterPropertyFlowCrm",
    "referencesExisting": false,
    "module": {
      "horizontalModuleId": "i18n",
      "priority": "now",
      "reason": "O módulo declara explicitamente dois idiomas (pt-BR e en) no campo languages da solução. A capability i18nSupport está no plano com prioridade 'soon', mas o i18nPlugin foi aceito com prioridade 'now' nas decisões de implementação. O agente propertyDescriptionAgent também gera conteúdo em pt-BR ou en conforme o campo targetLanguage. Internacionalização é requisito estrutural desde o MVP.",
      "reusedOntologyRefs": [],
      "consumedByArtifacts": [
        "i18nPlugin",
        "propertyDescriptionAgent",
        "dashboardPage",
        "propertiesListPage",
        "propertyDetailPage",
        "leadPipelinePage",
        "leadDetailPage",
        "visitsSchedulerPage",
        "dealTrackerPage",
        "corretoresAdminPage"
      ],
      "languages": [
        "pt-BR",
        "en"
      ]
    }
  }
} as const;

export default i18nModulePlan;
