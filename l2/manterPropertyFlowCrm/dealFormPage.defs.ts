/// <mls fileReference="_102045_/l2/manterPropertyFlowCrm/dealFormPage.defs.ts" enhancement="_blank"/>

export const dealFormPagePagePlan = {
  "schemaVersion": "2026-06-06",
  "artifactType": "page",
  "artifactId": "dealFormPage",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanPageDefinition",
    "stepId": 58,
    "planId": ""
  },
  "data": {
    "pageDefinition": {
      "pageId": "dealFormPage",
      "pageName": "Formulário de Negócio",
      "actor": "corretorActor",
      "purpose": "Criação de novo negócio/proposta vinculando obrigatoriamente um imóvel e um lead, com valor da proposta e etapa inicial (proposta). Garante que ambos os vínculos obrigatórios estejam preenchidos antes de confirmar.",
      "capabilities": [
        "trackDeals",
        "roleBasedAccess"
      ],
      "flowRefs": {
        "experienceFlows": [],
        "entityLifecycles": [
          "dealStageProgression"
        ],
        "taskWorkflows": [],
        "automations": []
      },
      "pluginRefs": [
        "i18n"
      ],
      "mdmRefs": [
        "property",
        "lead",
        "broker"
      ],
      "pageInputs": [
        {
          "name": "leadId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "queryParam",
            "previousStepResult"
          ],
          "description": "Lead pré-selecionado quando a página é aberta a partir do detalhe do lead.",
          "entityRef": "Lead",
          "fieldRef": "leadId"
        },
        {
          "name": "propertyId",
          "type": "string",
          "required": false,
          "sources": [
            "routeParam",
            "queryParam",
            "previousStepResult"
          ],
          "description": "Imóvel pré-selecionado quando a página é aberta a partir do detalhe do imóvel.",
          "entityRef": "Property",
          "fieldRef": "propertyId"
        }
      ],
      "navigationRefs": [
        {
          "direction": "inbound",
          "pageId": "dealTrackerPage",
          "trigger": "Clique em 'Novo Negócio'"
        },
        {
          "direction": "inbound",
          "pageId": "leadDetailPage",
          "trigger": "Clique em 'Criar Negócio'",
          "description": "Abre o formulário com leadId pré-selecionado"
        },
        {
          "direction": "outbound",
          "pageId": "dealTrackerPage",
          "trigger": "Salvar negócio com sucesso ou cancelar"
        }
      ],
      "sections": [
        {
          "sectionName": "Seleção de Imóvel",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "PropertySelectorOrganism",
              "purpose": "Permitir ao corretor buscar e selecionar o imóvel a ser vinculado ao negócio. Pré-popula com propertyId recebido via pageInput quando disponível.",
              "userActions": [
                "Buscar imóvel por endereço ou código",
                "Selecionar imóvel da lista"
              ],
              "requiredEntities": [
                "Property"
              ],
              "readsFields": [
                "propertyId",
                "address",
                "type",
                "status",
                "price"
              ],
              "writesFields": [
                "propertyId"
              ],
              "rulesApplied": [
                "rule-deal-requires-property-and-lead",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Seleção de Lead",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "LeadSelectorOrganism",
              "purpose": "Permitir ao corretor buscar e selecionar o lead/cliente a ser vinculado ao negócio. Pré-popula com leadId recebido via pageInput quando disponível.",
              "userActions": [
                "Buscar lead por nome ou e-mail",
                "Selecionar lead da lista"
              ],
              "requiredEntities": [
                "Lead"
              ],
              "readsFields": [
                "leadId",
                "name",
                "email",
                "phone",
                "stage"
              ],
              "writesFields": [
                "leadId"
              ],
              "rulesApplied": [
                "rule-deal-requires-property-and-lead",
                "rule-rbac-data-isolation"
              ]
            }
          ]
        },
        {
          "sectionName": "Dados da Proposta",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "DealProposalFormOrganism",
              "purpose": "Capturar o valor da proposta, tipo de negócio (venda/aluguel) e observações iniciais. Etapa inicial é sempre 'proposta' e não editável pelo usuário.",
              "userActions": [
                "Informar valor da proposta",
                "Selecionar tipo de negócio (venda/aluguel)",
                "Adicionar observações opcionais"
              ],
              "requiredEntities": [
                "Deal"
              ],
              "readsFields": [],
              "writesFields": [
                "proposedValue",
                "dealType",
                "notes",
                "initialStage"
              ],
              "rulesApplied": [
                "rule-deal-stage-transition"
              ]
            }
          ]
        },
        {
          "sectionName": "Confirmação de Criação",
          "mode": "edit",
          "organisms": [
            {
              "organismName": "DealCreationConfirmOrganism",
              "purpose": "Resumo dos dados selecionados (imóvel, lead, valor, tipo) e botão de confirmação para criar o negócio. Bloqueia envio se propertyId ou leadId estiverem ausentes.",
              "userActions": [
                "Confirmar criação do negócio",
                "Cancelar e voltar ao Rastreador de Negócios"
              ],
              "requiredEntities": [
                "Deal",
                "Property",
                "Lead"
              ],
              "readsFields": [
                "propertyId",
                "leadId",
                "proposedValue",
                "dealType",
                "notes"
              ],
              "writesFields": [
                "dealId",
                "stage",
                "createdAt"
              ],
              "rulesApplied": [
                "rule-deal-requires-property-and-lead",
                "rule-rbac-data-isolation",
                "rule-deal-stage-transition"
              ]
            }
          ]
        }
      ]
    },
    "bffCommands": [
      {
        "commandName": "listPropertiesForSelection",
        "purpose": "Buscar imóveis disponíveis para seleção no formulário de negócio, filtrando por termo de busca (endereço, código). Respeita isolamento RBAC do corretor autenticado.",
        "kind": "query",
        "input": [
          {
            "name": "searchTerm",
            "type": "string",
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
            "name": "address",
            "type": "string"
          },
          {
            "name": "type",
            "type": "string"
          },
          {
            "name": "status",
            "type": "string"
          },
          {
            "name": "price",
            "type": "number"
          },
          {
            "name": "total",
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
          "advanceDealStageUsecase"
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
        "commandName": "listLeadsForSelection",
        "purpose": "Buscar leads disponíveis para seleção no formulário de negócio, filtrando por nome ou e-mail. Respeita isolamento RBAC do corretor autenticado.",
        "kind": "query",
        "input": [
          {
            "name": "searchTerm",
            "type": "string",
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
            "name": "leadId",
            "type": "string"
          },
          {
            "name": "name",
            "type": "string"
          },
          {
            "name": "email",
            "type": "string"
          },
          {
            "name": "phone",
            "type": "string"
          },
          {
            "name": "stage",
            "type": "string"
          },
          {
            "name": "total",
            "type": "number"
          }
        ],
        "readsEntities": [
          "Lead"
        ],
        "writesEntities": [],
        "readsTables": [],
        "writesTables": [],
        "usecaseRefs": [
          "advanceDealStageUsecase"
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
        "commandName": "createDeal",
        "purpose": "Criar novo negócio/proposta vinculando obrigatoriamente um imóvel e um lead, com valor da proposta e etapa inicial 'proposta'. Registra o evento de transição inicial e atualiza a métrica de pipeline.",
        "kind": "mutation",
        "input": [
          {
            "name": "propertyId",
            "type": "string",
            "required": true
          },
          {
            "name": "leadId",
            "type": "string",
            "required": true
          },
          {
            "name": "proposedValue",
            "type": "number",
            "required": false
          },
          {
            "name": "dealType",
            "type": "string",
            "required": false
          },
          {
            "name": "notes",
            "type": "string",
            "required": false
          }
        ],
        "output": [
          {
            "name": "dealId",
            "type": "string"
          },
          {
            "name": "stage",
            "type": "DealStageEnum"
          },
          {
            "name": "createdAt",
            "type": "date"
          }
        ],
        "readsEntities": [
          "Property",
          "Lead",
          "Corretor"
        ],
        "writesEntities": [
          "Deal",
          "DealStageTransitionEvent"
        ],
        "readsTables": [],
        "writesTables": [
          "deal_stage_transition_event_log"
        ],
        "usecaseRefs": [
          "advanceDealStageUsecase"
        ],
        "layerContract": {
          "controllerLayer": "layer_2_controllers",
          "mustCallLayer": "layer_3_usecases",
          "directTableAccessForbidden": true
        },
        "rulesApplied": [
          "rule-deal-requires-property-and-lead",
          "rule-deal-stage-transition",
          "rule-rbac-data-isolation"
        ]
      }
    ]
  }
} as const;

export default dealFormPagePagePlan;
