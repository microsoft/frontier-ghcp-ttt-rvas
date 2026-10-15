// Main Bicep template — orchestrates all modules

@description('Azure region for all resources')
param location string = resourceGroup().location

@description('Project name, used in resource naming')
param projectName string = 'copilot-webapp'

@description('Deployment environment')
@allowed([
  'dev'
  'staging'
  'production'
])
param environment string = 'dev'

@description('Administrator login for PostgreSQL')
param dbAdminLogin string = 'pgadmin'

@secure()
@description('Administrator password for PostgreSQL')
param dbAdminPassword string

// --- Network Layer ---
module network './modules/network/network.bicep' = {
  name: 'network-deployment'
  params: {
    location: location
    projectName: projectName
    environment: environment
  }
}

// --- App Service Layer ---
module appService './modules/appService/appService.bicep' = {
  name: 'appservice-deployment'
  params: {
    location: location
    projectName: projectName
    environment: environment
    subnetId: network.outputs.appSubnetId
    databaseFqdn: database.outputs.databaseFqdn
    dbAdminLogin: dbAdminLogin
    dbAdminPassword: dbAdminPassword
  }
}

// --- Database Layer ---
module database './modules/database/database.bicep' = {
  name: 'database-deployment'
  params: {
    location: location
    projectName: projectName
    environment: environment
    subnetId: network.outputs.dbSubnetId
    privateDnsZoneId: network.outputs.privateDnsZoneId
    dbAdminLogin: dbAdminLogin
    dbAdminPassword: dbAdminPassword
  }
}

// --- Outputs ---
output webAppUrl string = appService.outputs.webAppUrl
output databaseFqdn string = database.outputs.databaseFqdn
