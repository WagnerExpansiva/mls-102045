/// <mls fileReference="_102045_/l1/manterPropertyFlowCrm/layer_1_external/Property.defs.ts" enhancement="_blank"/>

export const PropertyMdm = {
  "schemaVersion": "2026-06-06",
  "artifactType": "mdmEntity",
  "artifactId": "Property",
  "moduleName": "manterPropertyFlowCrm",
  "status": "draft",
  "source": {
    "agentName": "agentPlanMDM",
    "stepId": 12,
    "planId": "plan-mdm"
  },
  "data": {
    "kind": "mdmEntity",
    "entity": "Property",
    "ownership": "mdmOwned",
    "generateTable": false,
    "moduleId": "manterPropertyFlowCrm",
    "domainId": "property",
    "infrastructureModuleRef": "102034",
    "domainTitle": "Imóvel",
    "sourceOfTruth": "102034",
    "governanceRules": [
      "rule-property-status-transition",
      "rule-rbac-data-isolation"
    ],
    "title": "Imóvel",
    "description": "Entidade mestre central do domínio imobiliário. Representa um imóvel disponível para venda ou locação, com todos os seus atributos, características e fotos mock.",
    "fields": [
      {
        "fieldId": "propertyId",
        "type": "string",
        "required": true,
        "description": "Identificador único do imóvel (UUID)."
      },
      {
        "fieldId": "title",
        "type": "string",
        "required": true,
        "description": "Título ou nome de referência do imóvel."
      },
      {
        "fieldId": "description",
        "type": "string",
        "required": false,
        "description": "Descrição profissional do imóvel, podendo ser gerada pelo agente de IA."
      },
      {
        "fieldId": "propertyType",
        "type": "enum(apartamento,casa,comercial,terreno,rural,outro)",
        "required": true,
        "description": "Tipo do imóvel."
      },
      {
        "fieldId": "transactionType",
        "type": "enum(venda,locacao,ambos)",
        "required": true,
        "description": "Tipo de transação: venda, locação ou ambos."
      },
      {
        "fieldId": "price",
        "type": "number",
        "required": true,
        "description": "Preço de venda ou valor de locação mensal em reais."
      },
      {
        "fieldId": "status",
        "type": "enum(disponivel,reservado,vendido,alugado,inativo)",
        "required": true,
        "description": "Status atual do imóvel no ciclo de vida."
      },
      {
        "fieldId": "addressStreet",
        "type": "string",
        "required": true,
        "description": "Logradouro do endereço do imóvel."
      },
      {
        "fieldId": "addressNumber",
        "type": "string",
        "required": true,
        "description": "Número do endereço."
      },
      {
        "fieldId": "addressComplement",
        "type": "string",
        "required": false,
        "description": "Complemento do endereço (apto, bloco etc.)."
      },
      {
        "fieldId": "addressNeighborhood",
        "type": "string",
        "required": true,
        "description": "Bairro do imóvel."
      },
      {
        "fieldId": "addressCity",
        "type": "string",
        "required": true,
        "description": "Cidade do imóvel."
      },
      {
        "fieldId": "addressState",
        "type": "string",
        "required": true,
        "description": "Estado (UF) do imóvel."
      },
      {
        "fieldId": "addressZipCode",
        "type": "string",
        "required": false,
        "description": "CEP do imóvel."
      },
      {
        "fieldId": "areaM2",
        "type": "number",
        "required": false,
        "description": "Área total do imóvel em metros quadrados."
      },
      {
        "fieldId": "bedrooms",
        "type": "integer",
        "required": false,
        "description": "Número de quartos/dormitórios."
      },
      {
        "fieldId": "bathrooms",
        "type": "integer",
        "required": false,
        "description": "Número de banheiros."
      },
      {
        "fieldId": "parkingSpots",
        "type": "integer",
        "required": false,
        "description": "Número de vagas de garagem."
      },
      {
        "fieldId": "features",
        "type": "string[]",
        "required": false,
        "description": "Lista de características e diferenciais do imóvel (ex: piscina, churrasqueira, academia)."
      },
      {
        "fieldId": "photoUrls",
        "type": "string[]",
        "required": false,
        "description": "Lista de URLs de fotos mock do imóvel (picsum.photos)."
      },
      {
        "fieldId": "aiBullets",
        "type": "string",
        "required": false,
        "description": "Bullets/características em texto livre usados como input para o agente de geração de descrição IA."
      },
      {
        "fieldId": "assignedCorretorId",
        "type": "string",
        "required": false,
        "description": "ID do corretor responsável pelo imóvel."
      },
      {
        "fieldId": "createdAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora de criação do registro."
      },
      {
        "fieldId": "updatedAt",
        "type": "datetime",
        "required": true,
        "description": "Data e hora da última atualização."
      },
      {
        "fieldId": "createdBy",
        "type": "string",
        "required": true,
        "description": "ID do usuário que criou o registro."
      }
    ]
  }
} as const;

export default PropertyMdm;
