/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/advanceDealStageUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "advanceDealStageUsecase",
  "title": "Avançar / Regredir Etapa do Negócio",
  "purpose": "Valida e executa a transição de etapa de um negócio/proposta, registra o evento de transição e atualiza a métrica de pipeline de fechamentos.",
  "actor": "corretorActor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "transitionEventLogEntity"
  ],
  "outputEntities": [
    "transitionEventLogEntity"
  ],
  "readsTables": [
    {
      "tableName": "deal_stage_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "deal",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "lead",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "property",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "deal_stage_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "deal",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "deal_pipeline_metric",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [
    "rule-deal-stage-transition",
    "rule-deal-requires-property-and-lead",
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "advanceDealStage",
      "input": [
        {
          "name": "dealId",
          "type": "string",
          "required": true
        },
        {
          "name": "fromStage",
          "type": "DealStageEnum",
          "required": true
        },
        {
          "name": "toStage",
          "type": "DealStageEnum",
          "required": true
        },
        {
          "name": "reason",
          "type": "string",
          "required": false
        },
        {
          "name": "corretorId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "eventId",
          "type": "string"
        },
        {
          "name": "dealId",
          "type": "string"
        },
        {
          "name": "newStage",
          "type": "DealStageEnum"
        },
        {
          "name": "transitionedAt",
          "type": "date"
        }
      ]
    },
    {
      "commandId": "markDealLost",
      "input": [
        {
          "name": "dealId",
          "type": "string",
          "required": true
        },
        {
          "name": "lostReason",
          "type": "string",
          "required": true
        },
        {
          "name": "corretorId",
          "type": "string",
          "required": true
        }
      ],
      "output": [
        {
          "name": "eventId",
          "type": "string"
        },
        {
          "name": "dealId",
          "type": "string"
        },
        {
          "name": "newStage",
          "type": "DealStageEnum"
        },
        {
          "name": "transitionedAt",
          "type": "date"
        }
      ]
    },
    {
      "commandId": "createDeal",
      "input": [
        {
          "name": "leadId",
          "type": "string",
          "required": true
        },
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "corretorId",
          "type": "string",
          "required": true
        },
        {
          "name": "proposedValue",
          "type": "number",
          "required": false
        },
        {
          "name": "notes",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "dealId",
          "type": "string"
        },
        {
          "name": "stage",
          "type": "DealStageEnum"
        },
        {
          "name": "createdAt",
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
