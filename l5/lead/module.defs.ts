/// <mls fileReference="_102045_/l5/lead/module.defs.ts" enhancement="_blank"/>

export const leadMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "lead",
  "moduleName": "lead",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "lead",
    "domainId": "lead",
    "plannedByModule": "propertyFlowCrm",
    "referencesExisting": false,
    "domain": {
      "domainId": "lead",
      "title": "Lead/Cliente",
      "masterEntities": [
        "Lead"
      ],
      "sourceOfTruth": "leadDetailPage e casos de uso de lead (createLeadUsecase, updateLeadStageUsecase, updateLeadNotesUsecase)",
      "consumers": [
        "leadsPipelinePage",
        "leadDetailPage",
        "visitsSchedulerPage",
        "dealsTrackerPage",
        "dashboardPage",
        "adminMetricsPage",
        "aiLeadQualificationAgent",
        "createLeadUsecase",
        "updateLeadNotesUsecase",
        "updateLeadStageUsecase",
        "qualifyLeadUsecase",
        "metricTableCrmBasico",
        "metricDashboardCrmBasico",
        "i18nModule",
        "leadStageWorkflow",
        "visitSchedulingWorkflow",
        "dealStageWorkflow",
        "createDealUsecase",
        "updateDealStageUsecase",
        "scheduleVisitUsecase",
        "rescheduleVisitUsecase",
        "cancelVisitUsecase"
      ],
      "governanceRules": [
        "ruleLeadTemperature",
        "ruleLeadStageTransition",
        "Dados de lead devem ser mantidos centralizados e referenciados por identificador único",
        "Movimentações no pipeline devem registrar histórico de alterações"
      ]
    }
  }
} as const;

export default leadMdmModulePlan;
