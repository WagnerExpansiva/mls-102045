/// <mls fileReference="_102045_/l5/authRoles/module.defs.ts" enhancement="_blank"/>

export const authRolesModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "horizontalModule",
  "artifactId": "authRoles",
  "moduleName": "authRoles",
  "status": "draft",
  "source": {
    "agentName": "agentPlanHorizontals",
    "stepId": 13,
    "planId": "plan-horizontals"
  },
  "data": {
    "kind": "horizontal",
    "moduleId": "authRoles",
    "horizontalModuleId": "authRoles",
    "plannedByModule": "propertyFlowCrm",
    "referencesExisting": false,
    "module": {
      "horizontalModuleId": "authRoles",
      "priority": "now",
      "reason": "O sistema define três atores com permissões distintas (broker, agencyManager, admin) que requerem autorização baseada em papéis conforme decisão aceita authorizationModule.",
      "reusedOntologyRefs": [
        "UserAccount",
        "Role",
        "Permission"
      ],
      "consumedByArtifacts": [
        "Broker",
        "brokersManagementPage",
        "dashboardPage",
        "propertiesListPage",
        "leadsPipelinePage",
        "visitSchedulerPage",
        "dealsTrackerPage"
      ],
      "roles": [
        "broker",
        "agencyManager",
        "admin"
      ]
    }
  }
} as const;

export default authRolesModulePlan;
