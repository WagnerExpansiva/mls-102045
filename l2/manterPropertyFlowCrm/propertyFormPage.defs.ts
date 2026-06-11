/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/propertyFormPage.defs.ts" enhancement="_blank"/>

export const propertyFormPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "propertyFormPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "propertyFormPage",
      "pageName": "Formulário de Imóvel",
      "actor": "adminActor",
      "purpose": "Criação e edição de imóvel com todos os campos necessários (tipo, endereço, valor, fotos, descrição). Inclui ação de geração de descrição com IA via agente LLM, com revisão obrigatória antes de salvar.",
      "capabilities": [
        "manageProperties",
        "aiPropertyDescription",
        "roleBasedAccess"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "propertyStatusUpdate"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [
        "i18n",
        "mockImage",
        "provedor"
      ],
      "mdmRefs": [
        "property"
      ],
      "pageInputs": [
        {
          "name": "propertyId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam"
          ],
          "description": "ID do imóvel a ser editado. Ausente indica modo criação.",
          "entityRef": "Property",
          "fieldRef": "propertyId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "propertyListPage",
          "trigger": "Clique em 'Novo Imóvel' ou 'Editar' na lista de imóveis"
        },
        {
          "direction": "outbound",
          "pageId": "propertyListPage",
          "trigger": "Salvar imóvel com sucesso ou cancelar edição"
        }
      ],
      "sections": [
        {
          "sectionName": "Cabeçalho do Formulário",
          "mode": "view",
          "organisms": [
            {
              "organismName": "FormHeaderOrganism",
              "purpose": "Exibe o título dinâmico do formulário ('Novo Imóvel' ou 'Editar Imóvel') e o status atual do imóvel em modo edição, com botão de cancelar.",
              "userActions": [
                "Cancelar e retornar à lista"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.propertyId",
                "Property.title",
                "Property.status"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Dados Principais do Imóvel",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "PropertyBasicDataFormOrganism",
              "purpose": "Formulário com os campos principais do imóvel: título, tipo, endereço, preço, área, quartos, banheiros e status. Carrega dados existentes em modo edição.",
              "userActions": [
                "Preencher título do imóvel",
                "Selecionar tipo do imóvel",
                "Preencher endereço completo",
                "Informar preço",
                "Informar área em m²",
                "Informar número de quartos",
                "Informar número de banheiros",
                "Selecionar status do imóvel (modo edição)"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.propertyId",
                "Property.title",
                "Property.type",
                "Property.address",
                "Property.price",
                "Property.area",
                "Property.bedrooms",
                "Property.bathrooms",
                "Property.status"
              ],
              "writesFields": [
                "Property.title",
                "Property.type",
                "Property.address",
                "Property.price",
                "Property.area",
                "Property.bedrooms",
                "Property.bathrooms",
                "Property.status"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation",
                "rule-property-status-transition"
              ]
            }
          ]
        },
        {
          "sectionName": "Fotos do Imóvel",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "PropertyPhotosOrganism",
              "purpose": "Gerencia a URL de imagem do imóvel via plugin mockImage (picsum.photos). Exibe preview da imagem atual e permite informar ou gerar nova URL de imagem placeholder.",
              "userActions": [
                "Informar URL de imagem",
                "Gerar URL de imagem placeholder via mockImage"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.imageUrl"
              ],
              "writesFields": [
                "Property.imageUrl"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Descrição do Imóvel com IA",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "PropertyDescriptionAIOrganism",
              "purpose": "Área de edição da descrição textual do imóvel. Permite ao usuário redigir manualmente ou acionar o agente LLM para gerar uma descrição profissional com base nos atributos preenchidos. O resultado gerado é exibido para revisão antes de ser aceito.",
              "userActions": [
                "Redigir descrição manualmente",
                "Selecionar idioma alvo para geração (pt-BR ou en)",
                "Acionar geração de descrição com IA",
                "Revisar descrição gerada pelo agente",
                "Aceitar descrição gerada (substituir campo)",
                "Descartar descrição gerada"
              ],
              "requiredEntities": [
                "Property",
                "PropertyDescriptionCommand"
              ],
              "readsFields": [
                "Property.description",
                "Property.title",
                "Property.type",
                "Property.address",
                "Property.price",
                "Property.area",
                "Property.bedrooms",
                "Property.bathrooms",
                "PropertyDescriptionCommand.generatedDescription",
                "PropertyDescriptionCommand.status"
              ],
              "writesFields": [
                "Property.description"
              ],
              "rulesApplied": [
                "rule-llm-agent-invocation",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Ações do Formulário",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "PropertyFormActionsOrganism",
              "purpose": "Barra de ações com botão primário de salvar (criar ou atualizar imóvel) e botão secundário de cancelar. Exibe feedback de validação e confirmação de sucesso.",
              "userActions": [
                "Salvar imóvel (criar ou atualizar)",
                "Cancelar e retornar à lista"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "Property.propertyId"
              ],
              "writesFields": [
                "Property.title",
                "Property.type",
                "Property.address",
                "Property.price",
                "Property.area",
                "Property.bedrooms",
                "Property.bathrooms",
                "Property.imageUrl",
                "Property.description",
                "Property.status"
              ],
              "rulesApplied": [
                "rule-rbac-data-isolation",
                "rule-property-status-transition"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "getPropertyById",
        "purpose": "Busca os dados completos de um imóvel existente para pré-preencher o formulário em modo edição.",
        "kind": "query",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          }
        ],
        "output": [
          {
            "name": "propertyId",
            "type": "string"
          },
          {
            "name": "title",
            "type": "string"
          },
          {
            "name": "type",
            "type": "string"
          },
          {
            "name": "address",
            "type": "string"
          },
          {
            "name": "price",
            "type": "number"
          },
          {
            "name": "area",
            "type": "number"
          },
          {
            "name": "bedrooms",
            "type": "number"
          },
          {
            "name": "bathrooms",
            "type": "number"
          },
          {
            "name": "imageUrl",
            "type": "string"
          },
          {
            "name": "description",
            "type": "string"
          },
          {
            "name": "status",
            "type": "PropertyStatusEnum"
          },
          {
            "name": "createdAt",
            "type": "date"
          },
          {
            "name": "updatedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Property"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "updatePropertyStatusUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-rbac-data-isolation"
        ]
      },
      {
        "commandName": "createProperty",
        "purpose": "Cadastra um novo imóvel no sistema com todos os campos obrigatórios e opcionais. Registra o status inicial como 'disponivel' e persiste via MDM de Imóvel.",
        "kind": "mutation",
        "input": [
          {
            "name": "title",
            "type": "string",
            "required": true
          },
          {
            "name": "type",
            "type": "string",
            "required": true
          },
          {
            "name": "address",
            "type": "string",
            "required": true
          },
          {
            "name": "price",
            "type": "number",
            "required": true
          },
          {
            "name": "area",
            "type": "number",
            "required": false
          },
          {
            "name": "bedrooms",
            "type": "number",
            "required": false
          },
          {
            "name": "bathrooms",
            "type": "number",
            "required": false
          },
          {
            "name": "imageUrl",
            "type": "string",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "propertyId",
            "type": "string"
          },
          {
            "name": "status",
            "type": "PropertyStatusEnum"
          },
          {
            "name": "createdAt",
            "type": "date"
          }
        ],
        "readsEntities": [],
        "writesEntities": [
          "Property"
        ],
        "readsTables": [],
        "writesTables": [
          "property_status_transition_event_log"
        ],
        "usecaseRefs": [
          "updatePropertyStatusUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-rbac-data-isolation",
          "rule-property-status-transition"
        ]
      },
      {
        "commandName": "updateProperty",
        "purpose": "Atualiza os dados de um imóvel existente. Quando o campo status é alterado, delega a transição ao updatePropertyStatusUsecase para validação e registro do evento.",
        "kind": "mutation",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          },
          {
            "name": "title",
            "type": "string",
            "required": false
          },
          {
            "name": "type",
            "type": "string",
            "required": false
          },
          {
            "name": "address",
            "type": "string",
            "required": false
          },
          {
            "name": "price",
            "type": "number",
            "required": false
          },
          {
            "name": "area",
            "type": "number",
            "required": false
          },
          {
            "name": "bedrooms",
            "type": "number",
            "required": false
          },
          {
            "name": "bathrooms",
            "type": "number",
            "required": false
          },
          {
            "name": "imageUrl",
            "type": "string",
            "required": false
          },
          {
            "name": "description",
            "type": "string",
            "required": false
          },
          {
            "name": "status",
            "type": "PropertyStatusEnum",
            "required": false
          }
        ],
        "output": [
          {
            "name": "propertyId",
            "type": "string"
          },
          {
            "name": "updatedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Property"
        ],
        "writesEntities": [
          "Property"
        ],
        "readsTables": [
          "property_status_transition_event_log"
        ],
        "writesTables": [
          "property_status_transition_event_log"
        ],
        "usecaseRefs": [
          "updatePropertyStatusUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-rbac-data-isolation",
          "rule-property-status-transition"
        ]
      },
      {
        "commandName": "generatePropertyDescription",
        "purpose": "Invoca o agente LLM (via plugin provedor) para gerar uma descrição profissional do imóvel com base nos atributos preenchidos no formulário. O resultado é retornado para revisão do usuário antes de ser salvo no campo descrição.",
        "kind": "command",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": false
          },
          {
            "name": "title",
            "type": "string",
            "required": true
          },
          {
            "name": "type",
            "type": "string",
            "required": true
          },
          {
            "name": "address",
            "type": "string",
            "required": false
          },
          {
            "name": "price",
            "type": "number",
            "required": false
          },
          {
            "name": "area",
            "type": "number",
            "required": false
          },
          {
            "name": "bedrooms",
            "type": "number",
            "required": false
          },
          {
            "name": "bathrooms",
            "type": "number",
            "required": false
          },
          {
            "name": "targetLanguage",
            "type": "enum(pt-BR,en)",
            "required": true
          },
          {
            "name": "tone",
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
          },
          {
            "name": "status",
            "type": "enum(pending,completed,failed)"
          }
        ],
        "readsEntities": [
          "Property",
          "PropertyDescriptionCommand"
        ],
        "writesEntities": [
          "PropertyDescriptionCommand"
        ],
        "readsTables": [],
        "writesTables": [
          "ai_command_log"
        ],
        "usecaseRefs": [
          "generatePropertyDescriptionUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-llm-agent-invocation",
          "rule-rbac-data-isolation"
        ]
      }
    ]
  }
} as const;

export default propertyFormPagePagePlan;
