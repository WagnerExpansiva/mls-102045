/// <mls fileReference="_102045_/l5/property/module.defs.ts" enhancement="_blank"/>

export const propertyMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "property",
  "moduleName": "property",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "property",
    "domainId": "property",
    "plannedByModule": "propertyFlowCrm",
    "referencesExisting": false,
    "domain": {
      "domainId": "property",
      "title": "Imóvel",
      "masterEntities": [
        "Property"
      ],
      "sourceOfTruth": "propertyFormPage e casos de uso de imóvel (createPropertyUsecase, updatePropertyUsecase, archivePropertyUsecase)",
      "consumers": [
        "propertiesListPage",
        "propertyFormPage",
        "visitsSchedulerPage",
        "dealsTrackerPage",
        "dashboardPage",
        "adminMetricsPage",
        "aiPropertyDescriptionAgent",
        "createPropertyUsecase",
        "updatePropertyUsecase",
        "archivePropertyUsecase",
        "generatePropertyDescriptionUsecase",
        "metricTableCrmBasico",
        "metricDashboardCrmBasico",
        "i18nModule",
        "visitSchedulingWorkflow",
        "dealStageWorkflow",
        "createDealUsecase",
        "updateDealStageUsecase",
        "scheduleVisitUsecase",
        "rescheduleVisitUsecase",
        "cancelVisitUsecase"
      ],
      "governanceRules": [
        "rulePropertyStatus",
        "Dados de imóvel devem ser mantidos centralizados e referenciados por identificador único",
        "Alterações de status devem ser auditadas e replicadas aos consumidores"
      ]
    }
  }
} as const;

export default propertyMdmModulePlan;
