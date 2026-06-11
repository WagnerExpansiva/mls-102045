/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/updatePropertyStatusUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "updatePropertyStatusUsecase",
  "title": "Atualizar Status do Imóvel",
  "purpose": "Valida e executa a transição de status de um imóvel (disponivel → reservado → vendido/alugado/inativo), registra o evento de transição e atualiza a métrica de imóveis ativos.",
  "actor": "adminActor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "transitionEventLogEntity"
  ],
  "outputEntities": [
    "transitionEventLogEntity"
  ],
  "readsTables": [
    {
      "tableName": "property_status_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "property",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "property_status_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "property",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "active_properties_metric",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [
    "rule-property-status-transition",
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "createProperty",
      "input": [
        {
          "name": "title",
          "type": "string",
          "required": true
        },
        {
          "name": "type",
          "type": "string",
          "required": true
        },
        {
          "name": "address",
          "type": "string",
          "required": true
        },
        {
          "name": "price",
          "type": "number",
          "required": true
        },
        {
          "name": "area",
          "type": "number",
          "required": false
        },
        {
          "name": "bedrooms",
          "type": "number",
          "required": false
        },
        {
          "name": "bathrooms",
          "type": "number",
          "required": false
        },
        {
          "name": "imageUrl",
          "type": "string",
          "required": false
        },
        {
          "name": "description",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "propertyId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "PropertyStatusEnum"
        },
        {
          "name": "createdAt",
          "type": "date"
        }
      ]
    },
    {
      "commandId": "editProperty",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "title",
          "type": "string",
          "required": false
        },
        {
          "name": "price",
          "type": "number",
          "required": false
        },
        {
          "name": "description",
          "type": "string",
          "required": false
        },
        {
          "name": "imageUrl",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "propertyId",
          "type": "string"
        },
        {
          "name": "updatedAt",
          "type": "date"
        }
      ]
    },
    {
      "commandId": "updatePropertyStatus",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "fromStatus",
          "type": "PropertyStatusEnum",
          "required": true
        },
        {
          "name": "toStatus",
          "type": "PropertyStatusEnum",
          "required": true
        },
        {
          "name": "reason",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "eventId",
          "type": "string"
        },
        {
          "name": "propertyId",
          "type": "string"
        },
        {
          "name": "newStatus",
          "type": "PropertyStatusEnum"
        },
        {
          "name": "transitionedAt",
          "type": "date"
        }
      ]
    }
  ],
  "entityRefs": [
    "transitionEventLogEntity"
  ]
} as const;

export default useCase;
