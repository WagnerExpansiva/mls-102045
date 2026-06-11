/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/leadStageTransitionEventLog.defs.ts" enhancement="_blank"/>

export const leadStageTransitionEventLogTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "leadStageTransitionEventLog",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 42,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "leadStageTransitionEventLog",
      "tableName": "lead_stage_transition_event_log",
      "title": "Log de Transições de Etapa do Lead",
      "moduleId": "propertyFlowCrm",
      "ownership": "moduleOwned",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "purpose": "Registra cada transição de etapa do lead no funil (Kanban) como log imutável de eventos, preservando o histórico completo de movimentações para auditoria, rastreabilidade e suporte às regras de transição válidas (rule-lead-stage-transition).",
      "rootEntity": "LeadStageTransitionEvent",
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
          "name": "lead_id",
          "type": "uuid",
          "nullable": false,
          "description": "ID do lead (MDM) que sofreu a transição. Foreign ref para Lead MDM."
        },
        {
          "name": "from_stage",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Etapa de origem da transição (ex: novo, contato, visita, proposta, fechado, perdido)."
        },
        {
          "name": "to_stage",
          "type": "varchar(50)",
          "nullable": false,
          "description": "Etapa de destino da transição (ex: contato, visita, proposta, fechado, perdido)."
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
          "description": "Data e hora exata da transição. Usado para ordenação cronológica do histórico e filtros de data no Dashboard Operacional."
        },
        {
          "name": "details",
          "type": "jsonb",
          "nullable": true,
          "description": "Metadados contextuais da transição: motivo (transitionReason), origem da ação (manual, workflow, agente IA), dados do agente (action-classify-lead-ai), e quaisquer campos adicionais não críticos para filtragem."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "LeadStageTransitionEventDetails",
        "reason": "Armazena metadados contextuais da transição (motivo, origem da ação, dados do agente IA de action-classify-lead-ai) que não são necessários para filtragem, joins ou lifecycle, conforme recomendação detailsColumnRecommended=true do plano de persistência."
      },
      "foreignRefs": [
        {
          "fieldName": "lead_id",
          "targetEntity": "Lead",
          "targetOwnership": "mdmOwned",
          "reason": "O evento de transição pertence a um Lead gerenciado pelo MDM. Necessário para joins no Pipeline Kanban, Detalhe do Lead e Workflow de Transição."
        },
        {
          "fieldName": "performed_by",
          "targetEntity": "UserAccount",
          "targetOwnership": "horizontalOwned",
          "reason": "Rastreabilidade de quem realizou a transição. Suporta rule-rbac-data-isolation e auditoria."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_lstel_lead_id_occurred_at",
          "columns": [
            "lead_id",
            "occurred_at"
          ],
          "unique": false,
          "reason": "Lookup principal: busca do histórico cronológico de transições de um lead específico. Usado por Pipeline de Leads (Kanban), Detalhe do Lead e Workflow de Transição de Etapa."
        },
        {
          "indexName": "idx_lstel_occurred_at",
          "columns": [
            "occurred_at"
          ],
          "unique": false,
          "reason": "Filtro por período no Dashboard Operacional e relatórios de auditoria. Suporta queries de range temporal."
        },
        {
          "indexName": "idx_lstel_performed_by",
          "columns": [
            "performed_by"
          ],
          "unique": false,
          "reason": "Filtro por corretor responsável para isolamento de dados (rule-rbac-data-isolation) e auditoria de ações por usuário."
        },
        {
          "indexName": "idx_lstel_to_stage",
          "columns": [
            "to_stage"
          ],
          "unique": false,
          "reason": "Filtro por etapa de destino para análise de funil e métricas de conversão no Dashboard Operacional."
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
          "MonthlyLeadsMetric",
          "LeadConversionMetric"
        ],
        "updatedByLayer": "layer_3_usecases"
      },
      "rulesApplied": [
        "rule-lead-stage-transition",
        "rule-rbac-data-isolation"
      ]
    },
    "defsPlan": {
      "fileName": "tables/leadStageTransitionEventLog.defs.ts",
      "exportName": "leadStageTransitionEventLogTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default leadStageTransitionEventLogTableDefinition;
