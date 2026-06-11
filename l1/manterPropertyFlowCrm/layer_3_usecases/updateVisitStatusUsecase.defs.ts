/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/updateVisitStatusUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "updateVisitStatusUsecase",
  "title": "Atualizar Status da Visita",
  "purpose": "Valida e executa a transição de status de uma visita (agendada → confirmada → realizada / cancelada / reagendada), verifica conflito de horário, registra o evento e atualiza a métrica de visitas do mês.",
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
      "tableName": "visit_status_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "visit",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "lead",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "property",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "corretor",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "visit_status_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "visit",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "visits_per_month_metric",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [
    "rule-visit-no-conflict",
    "rule-visit-requires-property-lead-corretor",
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "scheduleVisit",
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
          "name": "scheduledAt",
          "type": "date",
          "required": true
        },
        {
          "name": "notes",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "visitId",
          "type": "string"
        },
        {
          "name": "status",
          "type": "VisitStatusEnum"
        },
        {
          "name": "scheduledAt",
          "type": "date"
        }
      ]
    },
    {
      "commandId": "updateVisitStatus",
      "input": [
        {
          "name": "visitId",
          "type": "string",
          "required": true
        },
        {
          "name": "fromStatus",
          "type": "VisitStatusEnum",
          "required": true
        },
        {
          "name": "toStatus",
          "type": "VisitStatusEnum",
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
          "name": "visitId",
          "type": "string"
        },
        {
          "name": "newStatus",
          "type": "VisitStatusEnum"
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
