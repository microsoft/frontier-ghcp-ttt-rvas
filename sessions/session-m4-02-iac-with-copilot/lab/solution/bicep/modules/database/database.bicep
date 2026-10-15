// Database module — Azure Database for PostgreSQL Flexible Server

@description('Azure region')
param location string

@description('Project name for resource naming')
param projectName string

@description('Deployment environment')
param environment string

@description('Subnet ID for private access')
param subnetId string

@description('Private DNS Zone ID for PostgreSQL')
param privateDnsZoneId string

@description('Database admin login')
param dbAdminLogin string

@secure()
@description('Database admin password')
param dbAdminPassword string

// --- PostgreSQL Flexible Server ---
resource postgresServer 'Microsoft.DBforPostgreSQL/flexibleServers@2023-12-01-preview' = {
  name: '${projectName}-${environment}-pgserver'
  location: location
  sku: {
    name: 'Standard_B1ms'
    tier: 'Burstable'
  }
  properties: {
    version: '15'
    administratorLogin: dbAdminLogin
    administratorLoginPassword: dbAdminPassword
    storage: {
      storageSizeGB: 32
    }
    backup: {
      backupRetentionDays: 7
      geoRedundantBackup: environment == 'production' ? 'Enabled' : 'Disabled'
    }
    highAvailability: {
      mode: environment == 'production' ? 'ZoneRedundant' : 'Disabled'
    }
    network: {
      delegatedSubnetResourceId: subnetId
      privateDnsZoneArmResourceId: privateDnsZoneId
    }
  }
}

// --- Default Database ---
resource database 'Microsoft.DBforPostgreSQL/flexibleServers/databases@2023-12-01-preview' = {
  parent: postgresServer
  name: 'appdb'
  properties: {
    charset: 'UTF8'
    collation: 'en_US.utf8'
  }
}

// --- Outputs ---
output databaseFqdn string = postgresServer.properties.fullyQualifiedDomainName
output serverName string = postgresServer.name
