/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_3_usecases/generatePropertyDescriptionUsecase.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "generatePropertyDescriptionUsecase",
  "title": "Gerar Descrição de Imóvel com IA",
  "purpose": "Invoca o agente LLM de geração de descrição de imóvel, registra o comando no log de IA e retorna o texto gerado para o corretor revisar antes de salvar.",
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
      "tableName": "property",
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
      "commandId": "generatePropertyDescription",
      "input": [
        {
          "name": "propertyId",
          "type": "string",
          "required": true
        },
        {
          "name": "tone",
          "type": "string",
          "required": false
        },
        {
          "name": "language",
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
          "name": "generatedDescription",
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
    "aiCommandLogEntity"
  ]
} as const;

export default useCase;
