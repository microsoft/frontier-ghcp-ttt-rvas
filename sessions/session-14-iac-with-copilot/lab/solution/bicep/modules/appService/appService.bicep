// App Service module — App Service Plan + Web App with VNet integration

@description('Azure region')
param location string

@description('Project name for resource naming')
param projectName string

@description('Deployment environment')
param environment string

@description('Subnet ID for VNet integration')
param subnetId string

@description('Database FQDN for connection string')
param databaseFqdn string

@description('Database admin login')
param dbAdminLogin string

@secure()
@description('Database admin password')
param dbAdminPassword string

// --- App Service Plan ---
resource appServicePlan 'Microsoft.Web/serverfarms@2023-12-01' = {
  name: '${projectName}-${environment}-plan'
  location: location
  kind: 'linux'
  sku: {
    name: 'B1'
    tier: 'Basic'
  }
  properties: {
    reserved: true // Required for Linux
  }
}

// --- Web App ---
resource webApp 'Microsoft.Web/sites@2023-12-01' = {
  name: '${projectName}-${environment}-app'
  location: location
  properties: {
    serverFarmId: appServicePlan.id
    virtualNetworkSubnetId: subnetId
    siteConfig: {
      linuxFxVersion: 'NODE|20-lts'
      alwaysOn: true
      appSettings: [
        {
          name: 'NODE_ENV'
          value: environment
        }
        {
          name: 'DATABASE_URL'
          value: 'postgresql://${dbAdminLogin}:${dbAdminPassword}@${databaseFqdn}:5432/appdb?sslmode=require'
        }
      ]
    }
    httpsOnly: true
  }
}

// --- Outputs ---
output webAppUrl string = 'https://${webApp.properties.defaultHostName}'
output webAppName string = webApp.name
