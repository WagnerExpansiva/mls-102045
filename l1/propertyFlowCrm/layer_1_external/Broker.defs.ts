/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_1_external/Broker.defs.ts" enhancement="_blank"/>

export const BrokerMdm = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmEntity",
  "artifactId": "Broker",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdmEntity",
    "entity": "Broker",
    "ownership": "mdmOwned",
    "generateTable": false,
    "moduleId": "propertyFlowCrm",
    "domainId": "broker",
    "domainTitle": "Corretor",
    "sourceOfTruth": "authRolesModule",
    "governanceRules": [
      "ruleBrokerPermissions",
      "Perfis de corretor/gestor devem ser mantidos no módulo de autenticação e autorização",
      "Vínculo de imóvel e lead ao corretor deve ser feito por referência ao identificador mestre"
    ],
    "title": "Corretor",
    "description": "Usuário responsável pelo atendimento e gestão do funil.",
    "fields": []
  }
} as const;

export default BrokerMdm;
