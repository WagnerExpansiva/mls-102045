/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/visitStatusTransitionEventLog.defs.ts" enhancement="_blank"/>

export const visitStatusTransitionEventLogTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "visitStatusTransitionEventLog",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 44,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "visitStatusTransitionEventLog",
      "tableName": "visit_status_transition_event_log",
      "title": "Log de Transições de Status da Visita",
      "moduleId": "propertyFlowCrm",
      "ownership": "moduleOwned",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "purpose": "Registra de forma imutável cada mudança de status de uma visita (agendada → confirmada → realizada / cancelada / reagendada), garantindo rastreabilidade completa do ciclo de vida e suporte à regra de não-conflito de horários. Alimenta a VisitsPerMonthMetric.",
      "rootEntity": "VisitStatusTransitionEvent",
      "primaryKey": [
        "event_id"
      ],
      "columns": [
        {
          "name": "event_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do evento de transição (UUID). Chave primária imutável."
        },
        {
          "name": "visit_id",
          "type": "uuid",
          "nullable": false,
          "description": "ID da visita (MDM) que sofreu a transição de status. FK para a entidade Visit gerenciada pelo MDM."
        },
        {
          "name": "from_status",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Status de origem da transição (ex: agendada, confirmada, realizada, cancelada, reagendada)."
        },
        {
          "name": "to_status",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Status de destino da transição. Indexado para filtros por estado final."
        },
        {
          "name": "performed_by",
          "type": "uuid",
          "nullable": false,
          "description": "ID do usuário (UserAccount horizontal) que realizou a transição. Suporta rule-rbac-data-isolation."
        },
        {
          "name": "occurred_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora exata da transição. Usado para ordenação cronológica e filtros de período (Dashboard Operacional, VisitsPerMonthMetric)."
        },
        {
          "name": "details",
          "type": "jsonb",
          "nullable": true,
          "description": "Dados complementares do evento: motivo da transição (transitionReason), referência a evento de calendário externo (plugin futuro) e quaisquer metadados adicionais não filtráveis."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "VisitStatusTransitionEventDetails",
        "reason": "transitionReason (motivo de cancelamento/reagendamento) e referência ao evento de calendário externo são dados complementares não utilizados em filtros, joins ou lifecycle direto. Armazenados como JSONB conforme recomendação da entidade e padrão eventLog."
      },
      "foreignRefs": [
        {
          "fieldName": "visit_id",
          "targetEntity": "Visit",
          "targetOwnership": "mdmOwned",
          "reason": "Toda transição pertence a uma visita gerenciada pelo MDM. Necessário para rastreabilidade e para o Workflow: Ciclo de Vida da Visita."
        },
        {
          "fieldName": "performed_by",
          "targetEntity": "UserAccount",
          "targetOwnership": "horizontalOwned",
          "reason": "Rastreabilidade de quem executou a transição; suporta rule-rbac-data-isolation e auditoria."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_vstel_visit_id",
          "columns": [
            "visit_id"
          ],
          "unique": false,
          "reason": "Lookup principal: buscar todo o histórico de transições de uma visita específica (Agendador de Visitas, Workflow: Ciclo de Vida da Visita, action-update-visit-status)."
        },
        {
          "indexName": "idx_vstel_visit_id_occurred_at",
          "columns": [
            "visit_id",
            "occurred_at"
          ],
          "unique": false,
          "reason": "Ordenação cronológica do log por visita; usado pelo Workflow para determinar o estado mais recente e validar rule-visit-no-conflict."
        },
        {
          "indexName": "idx_vstel_to_status",
          "columns": [
            "to_status"
          ],
          "unique": false,
          "reason": "Filtro por status de destino para agregações do Dashboard Operacional e cálculo da VisitsPerMonthMetric."
        },
        {
          "indexName": "idx_vstel_occurred_at",
          "columns": [
            "occurred_at"
          ],
          "unique": false,
          "reason": "Filtro por período (mês/semana) para o Dashboard Operacional e alimentação da VisitsPerMonthMetric."
        },
        {
          "indexName": "idx_vstel_performed_by",
          "columns": [
            "performed_by"
          ],
          "unique": false,
          "reason": "Suporte a rule-rbac-data-isolation: filtrar eventos realizados por um corretor específico."
        }
      ],
      "accessPolicy": {
        "directAccessAllowedFor": [
          "layer_3_usecases"
        ],
        "forbiddenFor": [
          "pages",
          "layer_2_controllers",
          "agents"
        ]
      },
      "metricUpdatePolicy": {
        "feedsMetrics": true,
        "metricRefs": [
          "VisitsPerMonthMetric"
        ],
        "updatedByLayer": "layer_3_usecases"
      },
      "rulesApplied": [
        "rule-visit-no-conflict",
        "rule-visit-requires-property-lead-corretor",
        "rule-rbac-data-isolation"
      ]
    },
    "defsPlan": {
      "fileName": "tables/visitStatusTransitionEventLog.defs.ts",
      "exportName": "visitStatusTransitionEventLogTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default visitStatusTransitionEventLogTableDefinition;
