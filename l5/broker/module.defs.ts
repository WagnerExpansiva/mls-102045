/// <mls fileReference="_102045_/l5/broker/module.defs.ts" enhancement="_blank"/>

export const brokerMdmModulePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmDomain",
  "artifactId": "broker",
  "moduleName": "broker",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdm",
    "moduleId": "broker",
    "domainId": "broker",
    "plannedByModule": "propertyFlowCrm",
    "referencesExisting": false,
    "domain": {
      "domainId": "broker",
      "title": "Corretor",
      "masterEntities": [
        "Broker"
      ],
      "sourceOfTruth": "authRolesModule",
      "consumers": [
        "authRolesModule"
      ],
      "governanceRules": [
        "ruleBrokerPermissions",
        "Perfis de corretor/gestor devem ser mantidos no módulo de autenticação e autorização",
        "Vínculo de imóvel e lead ao corretor deve ser feito por referência ao identificador mestre"
      ]
    }
  }
} as const;

export default brokerMdmModulePlan;
