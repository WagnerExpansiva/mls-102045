/// <mls fileReference="_102045_/l1/propertyFlowCrm/layer_3_usecases/viewDashboard.defs.ts" enhancement="_blank"/>

export const useCase = {
  "usecaseId": "viewDashboard",
  "title": "Visualizar dashboard",
  "purpose": "Carregar métricas agregadas para o gestor.",
  "actor": "gestor",
  "layer": "layer_3_usecases",
  "inputEntities": [
    "dashboardMetrics"
  ],
  "outputEntities": [
    "dashboardMetrics"
  ],
  "readsTables": [
    {
      "tableName": "property_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "lead_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "visit_metrics",
      "ownership": "moduleOwned"
    },
    {
      "tableName": "deal_metrics",
      "ownership": "moduleOwned"
    }
  ],
  "writesTables": [],
  "commands": [
    {
      "commandId": "viewDashboard",
      "input": [
        {
          "name": "periodStart",
          "type": "date",
          "required": false
        },
        {
          "name": "periodEnd",
          "type": "date",
          "required": false
        }
      ],
      "output": [
        {
          "name": "metrics",
          "type": "DashboardMetrics"
        }
      ]
    }
  ],
  "rulesApplied": [
    "ruleBrokerPermissions"
  ]
} as const;

export default useCase;
