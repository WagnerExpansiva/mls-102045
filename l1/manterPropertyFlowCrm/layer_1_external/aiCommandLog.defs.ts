/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/aiCommandLog.defs.ts" enhancement="_blank"/>

export const aiCommandLogTableDefinition = {
  "schemaVersion": "2026-06-06",
  "artifactType": "table",
  "artifactId": "aiCommandLog",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanTableDefinition",
    "stepId": 46,
    "planId": ""
  },
  "data": {
    "tableDefinition": {
      "tableId": "aiCommandLog",
      "tableName": "ai_command_log",
      "title": "Log de Comandos de IA (LLM)",
      "moduleId": "propertyFlowCrm",
      "ownership": "moduleOwned",
      "layer": "layer_1_external",
      "tableKind": "transactional",
      "purpose": "Registra todas as invocações dos agentes LLM (geração de descrição de imóvel, classificação de lead e sugestão de follow-up), armazenando input, output, modelo utilizado, latência e status para rastreabilidade, auditoria e melhoria contínua.",
      "rootEntity": "PropertyDescriptionCommand",
      "primaryKey": [
        "command_id"
      ],
      "columns": [
        {
          "name": "command_id",
          "type": "uuid",
          "nullable": false,
          "primaryKey": true,
          "description": "Identificador único do comando LLM (UUID). Chave primária da tabela."
        },
        {
          "name": "command_type",
          "type": "varchar(64)",
          "nullable": false,
          "description": "Discriminador do tipo de comando: 'property_description', 'lead_classification' ou 'followup_suggestion'."
        },
        {
          "name": "status",
          "type": "varchar(32)",
          "nullable": false,
          "default": "pending",
          "description": "Status do processamento do comando: pending, completed, failed."
        },
        {
          "name": "requested_by",
          "type": "uuid",
          "nullable": false,
          "description": "ID do usuário (UserAccount) que acionou o comando. Usado para RBAC e auditoria."
        },
        {
          "name": "property_id",
          "type": "uuid",
          "nullable": true,
          "description": "ID do imóvel relacionado ao comando (preenchido para command_type = 'property_description'). Referência ao MDM de Imóvel."
        },
        {
          "name": "lead_id",
          "type": "uuid",
          "nullable": true,
          "description": "ID do lead relacionado ao comando (preenchido para command_type = 'lead_classification' ou 'followup_suggestion'). Referência ao MDM de Lead."
        },
        {
          "name": "ai_model",
          "type": "varchar(128)",
          "nullable": true,
          "description": "Identificador do modelo LLM utilizado na invocação (ex: gpt-4o, claude-3-sonnet)."
        },
        {
          "name": "latency_ms",
          "type": "integer",
          "nullable": true,
          "description": "Latência da chamada ao agente LLM em milissegundos."
        },
        {
          "name": "token_count_input",
          "type": "integer",
          "nullable": true,
          "description": "Número de tokens consumidos no prompt de entrada."
        },
        {
          "name": "token_count_output",
          "type": "integer",
          "nullable": true,
          "description": "Número de tokens gerados na resposta do agente."
        },
        {
          "name": "error_message",
          "type": "text",
          "nullable": true,
          "description": "Mensagem de erro em caso de status = 'failed'."
        },
        {
          "name": "created_at",
          "type": "timestamptz",
          "nullable": false,
          "description": "Data e hora de criação/invocação do comando."
        },
        {
          "name": "completed_at",
          "type": "timestamptz",
          "nullable": true,
          "description": "Data e hora de conclusão do processamento do comando (completed ou failed)."
        },
        {
          "name": "details",
          "type": "jsonb",
          "nullable": true,
          "description": "Dados internos do comando: prompt completo, resposta bruta do agente, bullets de input, resultado de classificação, justificativa, sugestão de follow-up, idioma alvo, contexto do lead, etc."
        }
      ],
      "detailsColumn": {
        "enabled": true,
        "columnName": "details",
        "jsonSchemaRef": "AiCommandLogDetails",
        "reason": "Prompt, resposta bruta, bullets de input, resultado de classificação, justificativa, sugestão de follow-up, idioma alvo e contexto do lead variam por command_type, têm estrutura heterogênea e não são usados em filtros/joins frequentes. Armazenar como JSONB evita fragmentação em múltiplas colunas esparsas e facilita análise de uso de IA."
      },
      "foreignRefs": [
        {
          "fieldName": "requested_by",
          "targetEntity": "UserAccount",
          "targetOwnership": "horizontalOwned",
          "reason": "Rastreabilidade e RBAC: identifica o usuário autenticado que acionou o agente LLM (rule-rbac-data-isolation, rule-llm-agent-invocation)."
        },
        {
          "fieldName": "property_id",
          "targetEntity": "Property",
          "targetOwnership": "mdmOwned",
          "reason": "Referência ao imóvel para o qual a descrição foi gerada (command_type = property_description). Gerenciado pelo MDM de Imóvel."
        },
        {
          "fieldName": "lead_id",
          "targetEntity": "Lead",
          "targetOwnership": "mdmOwned",
          "reason": "Referência ao lead classificado ou para o qual foi gerada sugestão de follow-up. Gerenciado pelo MDM de Lead."
        }
      ],
      "indexes": [
        {
          "indexName": "idx_ai_command_log_command_type_status",
          "columns": [
            "command_type",
            "status"
          ],
          "unique": false,
          "reason": "Suporta consultas de auditoria e dashboards que filtram logs por tipo de agente e status de processamento."
        },
        {
          "indexName": "idx_ai_command_log_requested_by",
          "columns": [
            "requested_by"
          ],
          "unique": false,
          "reason": "Suporta isolamento de dados por usuário (RBAC) e consultas de histórico de comandos por corretor/assistente."
        },
        {
          "indexName": "idx_ai_command_log_lead_id",
          "columns": [
            "lead_id"
          ],
          "unique": false,
          "reason": "Suporta lookup de todos os comandos LLM associados a um lead específico (tela Detalhe do Lead / Cliente e Pipeline de Leads)."
        },
        {
          "indexName": "idx_ai_command_log_property_id",
          "columns": [
            "property_id"
          ],
          "unique": false,
          "reason": "Suporta lookup de todos os comandos de geração de descrição associados a um imóvel (tela Detalhe / Formulário de Imóvel)."
        },
        {
          "indexName": "idx_ai_command_log_created_at",
          "columns": [
            "created_at"
          ],
          "unique": false,
          "reason": "Suporta filtros por período para análise de uso de IA e melhoria contínua dos agentes."
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
        "feedsMetrics": false,
        "updatedByLayer": "layer_3_usecases"
      },
      "rulesApplied": [
        "rule-llm-agent-invocation",
        "rule-rbac-data-isolation"
      ]
    },
    "defsPlan": {
      "fileName": "tables/aiCommandLog.defs.ts",
      "exportName": "aiCommandLogTableDefinition",
      "saveAsDefs": true
    }
  }
} as const;

export default aiCommandLogTableDefinition;
