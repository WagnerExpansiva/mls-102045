/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_1_external/Property.defs.ts" enhancement="_blank"/>

export const PropertyMdm = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmEntity",
  "artifactId": "Property",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdmEntity",
    "entity": "Property",
    "ownership": "mdmOwned",
    "generateTable": false,
    "moduleId": "propertyFlowCrm",
    "domainId": "property",
    "domainTitle": "Imóvel",
    "sourceOfTruth": "propertyFormPage e casos de uso de imóvel (createPropertyUsecase, updatePropertyUsecase, archivePropertyUsecase)",
    "governanceRules": [
      "rulePropertyStatus",
      "Dados de imóvel devem ser mantidos centralizados e referenciados por identificador único",
      "Alterações de status devem ser auditadas e replicadas aos consumidores"
    ],
    "title": "Imóvel",
    "description": "Unidade imobiliária cadastrada para venda ou locação, com atributos, status e mídia.",
    "fields": []
  }
} as const;

export default PropertyMdm;
