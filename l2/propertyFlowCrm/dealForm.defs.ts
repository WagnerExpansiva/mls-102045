/// <mls fileReference="_102045_/l2/propertyFlowCrm/dealForm.defs.ts" enhancement="_blank"/>

export const dealFormPagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "dealForm",
  "moduleName": "propertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 63,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "dealForm",
      "pageName": "Criar proposta/negócio",
      "actor": "corretor",
      "purpose": "Registrar proposta/negócio com seleção de imóvel e lead antes de confirmar.",
      "capabilities": [
        "trackDeals"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "dealPipelineWorkflow"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [],
      "mdmRefs": [
        "property",
        "lead"
      ],
      "pageInputs": [
        {
          "name": "propertyId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "queryParam",
            "previousStepResult"
          ],
          "description": "Identificador do imóvel pré-selecionado.",
          "entityRef": "Property",
          "fieldRef": "propertyId"
        },
        {
          "name": "leadId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "queryParam",
            "previousStepResult"
          ],
          "description": "Identificador do lead pré-selecionado.",
          "entityRef": "Lead",
          "fieldRef": "leadId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "dealsPipeline",
          "trigger": "Criar proposta/negócio"
        },
        {
          "direction": "inbound",
          "pageId": "dealDetail",
          "trigger": "Editar proposta/negócio"
        }
      ],
      "sections": [
        {
          "sectionName": "Vincular imóvel",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "propertyIdInput",
              "purpose": "Selecionar o imóvel obrigatório para a proposta.",
              "userActions": [
                "informarPropertyId",
                "limparSelecao"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "propertyId"
              ],
              "writesFields": [
                "propertyId"
              ],
              "rulesApplied": [
                "ruleDealRequiresProperty"
              ]
            }
          ]
        },
        {
          "sectionName": "Vincular lead",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "leadIdInput",
              "purpose": "Selecionar o lead relacionado à proposta (opcional).",
              "userActions": [
                "informarLeadId",
                "limparSelecao"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId"
              ],
              "writesFields": [
                "leadId"
              ],
              "rulesApplied": [
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Detalhes da proposta",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "dealTermsForm",
              "purpose": "Registrar etapa inicial e valor proposto.",
              "userActions": [
                "definirStage",
                "informarValor"
              ],
              "requiredEntities": [
                "Deal"
              ],
              "readsFields": [
                "stage",
                "value"
              ],
              "writesFields": [
                "stage",
                "value"
              ],
              "rulesApplied": [
                "ruleDealStageTransition",
                "ruleBrokerPermissions"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmar proposta/negócio",
          "mode": "create",
          "organisms": [
            {
              "organismName": "dealCreateConfirmation",
              "purpose": "Confirmar e criar a proposta/negócio.",
              "userActions": [
                "confirmarCriacao"
              ],
              "requiredEntities": [
                "Deal"
              ],
              "readsFields": [
                "propertyId",
                "leadId",
                "stage",
                "value"
              ],
              "writesFields": [
                "dealId"
              ],
              "rulesApplied": [
                "ruleDealRequiresProperty",
                "ruleBrokerPermissions"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "createDeal",
        "purpose": "Criar proposta/negócio.",
        "kind": "command",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          },
          {
            "name": "leadId",
            "type": "string",
            "required": false
          },
          {
            "name": "stage",
            "type": "string",
            "required": true
          },
          {
            "name": "value",
            "type": "number",
            "required": false
          }
        ],
        "output": [
          {
            "name": "dealId",
            "type": "string"
          }
        ],
        "readsEntities": [
          "propertyAggregate",
          "leadAggregate"
        ],
        "writesEntities": [
          "dealAggregate"
        ],
        "readsTables": [],
        "writesTables": [
          "deal_metrics"
        ],
        "usecaseRefs": [
          "createDeal"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "ruleDealRequiresProperty",
          "ruleDealStageTransition",
          "ruleBrokerPermissions"
        ]
      }
    ]
  }
} as const;

export default dealFormPagePlan;
