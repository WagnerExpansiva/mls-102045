/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/propertyListPage.defs.ts" enhancement="_blank"/>

export const propertyListPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "propertyListPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 57,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "propertyListPage",
      "pageName": "Lista de Imóveis",
      "actor": "adminActor",
      "purpose": "Listagem, busca e filtragem de todos os imóveis cadastrados. Ponto de entrada para criar, editar e atualizar status de imóveis.",
      "capabilities": [
        "manageProperties",
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
        "mockImage"
      ],
      "mdmRefs": [
        "property"
      ],
      "pageInputs": [
        {
          "name": "status",
          "type": "PropertyStatusEnum",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Filtro de status do imóvel (disponivel, reservado, vendido, alugado, inativo)"
        },
        {
          "name": "type",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Filtro por tipo de imóvel (ex: apartamento, casa, comercial)"
        },
        {
          "name": "city",
          "type": "string",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Filtro por cidade do imóvel"
        },
        {
          "name": "priceMin",
          "type": "number",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Faixa de preço mínima para filtro"
        },
        {
          "name": "priceMax",
          "type": "number",
          "required": false,
          "sources": [
            "queryParam"
          ],
          "description": "Faixa de preço máxima para filtro"
        }
      ],
      "navigationRefs": [
        {
          "direction": "outbound",
          "pageId": "propertyFormPage",
          "trigger": "Clique em 'Novo Imóvel'",
          "description": "Navega para o formulário de criação de imóvel"
        },
        {
          "direction": "outbound",
          "pageId": "propertyFormPage",
          "trigger": "Clique em 'Editar' no item da lista",
          "description": "Navega para o formulário de edição do imóvel selecionado"
        },
        {
          "direction": "inbound",
          "pageId": "operationalDashboardPage",
          "trigger": "Clique em card de imóveis",
          "description": "Entrada a partir do Dashboard Operacional"
        }
      ],
      "sections": [
        {
          "sectionName": "Barra de Filtros e Busca",
          "mode": "read",
          "organisms": [
            {
              "organismName": "PropertyFilterBar",
              "purpose": "Permitir ao Admin filtrar e buscar imóveis por status, tipo, cidade e faixa de preço antes de visualizar a lista.",
              "userActions": [
                "Selecionar filtro de status",
                "Selecionar filtro de tipo",
                "Digitar cidade",
                "Definir faixa de preço mínima e máxima",
                "Aplicar filtros",
                "Limpar filtros"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "status",
                "type",
                "city",
                "price"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Lista de Imóveis",
          "mode": "read",
          "organisms": [
            {
              "organismName": "PropertyListTable",
              "purpose": "Exibir a lista paginada de imóveis com seus dados principais (título, tipo, cidade, preço, status, foto mock) e ações rápidas de editar e atualizar status.",
              "userActions": [
                "Visualizar lista de imóveis",
                "Navegar entre páginas (paginação)",
                "Clicar em 'Editar' para ir ao formulário de edição",
                "Clicar em 'Atualizar Status' para abrir modal de transição de status"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "propertyId",
                "title",
                "type",
                "city",
                "price",
                "status",
                "imageUrl",
                "area",
                "bedrooms",
                "bathrooms"
              ],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Ações Globais",
          "mode": "write",
          "organisms": [
            {
              "organismName": "PropertyListActions",
              "purpose": "Disponibilizar a ação de criação de novo imóvel e acesso rápido ao formulário.",
              "userActions": [
                "Clicar em 'Novo Imóvel' para navegar ao formulário de criação"
              ],
              "requiredEntities": [],
              "readsFields": [],
              "writesFields": [],
              "rulesApplied": [
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Modal de Atualização de Status",
          "mode": "write",
          "organisms": [
            {
              "organismName": "PropertyStatusUpdateModal",
              "purpose": "Permitir ao Admin selecionar o novo status de um imóvel respeitando as transições válidas definidas pela rule-property-status-transition e confirmar a mudança.",
              "userActions": [
                "Visualizar status atual do imóvel",
                "Selecionar novo status (apenas transições válidas habilitadas)",
                "Confirmar atualização de status",
                "Cancelar e fechar modal"
              ],
              "requiredEntities": [
                "Property",
                "PropertyStatusTransitionEvent"
              ],
              "readsFields": [
                "propertyId",
                "status"
              ],
              "writesFields": [
                "status"
              ],
              "rulesApplied": [
                "rule-property-status-transition",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listPropertiesQuery",
        "purpose": "Listar imóveis com filtros (status, tipo, cidade, faixa de preço) e paginação, respeitando isolamento de dados por perfil RBAC.",
        "kind": "query",
        "input": [
          {
            "name": "status",
            "type": "PropertyStatusEnum",
            "required": false
          },
          {
            "name": "type",
            "type": "string",
            "required": false
          },
          {
            "name": "city",
            "type": "string",
            "required": false
          },
          {
            "name": "priceMin",
            "type": "number",
            "required": false
          },
          {
            "name": "priceMax",
            "type": "number",
            "required": false
          },
          {
            "name": "page",
            "type": "number",
            "required": false
          },
          {
            "name": "pageSize",
            "type": "number",
            "required": false
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
            "name": "city",
            "type": "string"
          },
          {
            "name": "price",
            "type": "number"
          },
          {
            "name": "status",
            "type": "PropertyStatusEnum"
          },
          {
            "name": "imageUrl",
            "type": "string"
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
            "name": "totalCount",
            "type": "number"
          },
          {
            "name": "page",
            "type": "number"
          },
          {
            "name": "pageSize",
            "type": "number"
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
        "commandName": "updatePropertyStatusCommand",
        "purpose": "Atualizar o status de um imóvel respeitando as transições válidas definidas pela rule-property-status-transition, registrando o evento de transição em propertyStatusTransitionEventLog.",
        "kind": "mutation",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          },
          {
            "name": "fromStatus",
            "type": "PropertyStatusEnum",
            "required": true
          },
          {
            "name": "toStatus",
            "type": "PropertyStatusEnum",
            "required": true
          },
          {
            "name": "reason",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "eventId",
            "type": "string"
          },
          {
            "name": "propertyId",
            "type": "string"
          },
          {
            "name": "newStatus",
            "type": "PropertyStatusEnum"
          },
          {
            "name": "transitionedAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Property"
        ],
        "writesEntities": [
          "Property",
          "PropertyStatusTransitionEvent"
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
          "rule-property-status-transition",
          "rule-rbac-data-isolation"
        ]
      }
    ]
  }
} as const;

export default propertyListPagePagePlan;
