/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/classifyLeadAiUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "classifyLeadAiUsecase",
  "title": "Classificar Lead com IA (Quente/Morno/Frio)",
  "purpose": "Invoca o agente LLM de classificação de lead, registra o comando no log de IA, persiste a classificação no lead e retorna o resultado ao corretor.",
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
    }
  ],
  "writesTables": [
    {
      "tableName": "ai_command_log",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "lead",
      "ownership": "mdmOwned"
    }
  ],
  "rulesApplied": [
    "rule-llm-agent-invocation",
    "rule-rbac-data-isolation"
  ],
  "commands": [
    {
      "commandId": "classifyLeadAi",
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
        }
      ],
      "output": [
        {
          "name": "commandLogId",
          "type": "string"
        },
        {
          "name": "classification",
          "type": "LeadTemperatureEnum"
        },
        {
          "name": "justification",
          "type": "string"
        },
        {
          "name": "classifiedAt",
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
