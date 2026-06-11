/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/moveLeadStageUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "moveLeadStageUsecase",
  "title": "Mover Lead no Funil (Transição de Etapa)",
  "purpose": "Valida e executa a transição de etapa de um lead no pipeline (Kanban), registra o evento de transição e atualiza as métricas de leads do mês e taxa de conversão.",
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
      "tableName": "lead_stage_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "lead",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "lead_stage_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "lead",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "monthly_leads_metric",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "lead_conversion_metric",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [
    "rule-lead-stage-transition",
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "moveLeadStage",
      "input": [
        {
          "name": "leadId",
          "type": "string",
          "required": true
        },
        {
          "name": "fromStage",
          "type": "LeadStageEnum",
          "required": true
        },
        {
          "name": "toStage",
          "type": "LeadStageEnum",
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
          "name": "leadId",
          "type": "string"
        },
        {
          "name": "newStage",
          "type": "LeadStageEnum"
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
