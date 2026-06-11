/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/getFollowUpSuggestionUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "getFollowUpSuggestionUsecase",
  "title": "Obter Sugestão de Mensagem de Follow-up com IA",
  "purpose": "Invoca o agente LLM de sugestão de follow-up com base no histórico do lead, registra o comando no log de IA e retorna a mensagem sugerida.",
  "actor": "corretorActor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "aiCommandLogEntity"
  ],
  "outputEntities": [
    "aiCommandLogEntity"
  ],
  "readsTables": [
    {
      "tableName": "lead",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "lead_stage_transition_event_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "visit",
      "ownership": "mdmOwned"
    },
    {
      "tableName": "deal",
      "ownership": "mdmOwned"
    }
  ],
  "writesTables": [
    {
      "tableName": "ai_command_log",
      "ownership": "moduleOwned"
    }
  ],
  "rulesApplied": [
    "rule-llm-agent-invocation",
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "getFollowUpSuggestion",
      "input": [
        {
          "name": "leadId",
          "type": "string",
          "required": true
        },
        {
          "name": "corretorId",
          "type": "string",
          "required": true
        },
        {
          "name": "channel",
          "type": "string",
          "required": false
        }
      ],
      "output": [
        {
          "name": "commandLogId",
          "type": "string"
        },
        {
          "name": "suggestedMessage",
          "type": "string"
        },
        {
          "name": "generatedAt",
          "type": "date"
        }
      ]
    }
  ],
  "entityRefs": [
    "aiCommandLogEntity",
    "transitionEventLogEntity"
  ]
} as const;

export default useCase;
