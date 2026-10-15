// Bicep parameters — the starting point for this project.
// Copilot should generate modules and wire them together via this file.

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

// TODO: Add module references for network, appService, and database
// TODO: Add outputs for web app URL and database FQDN
