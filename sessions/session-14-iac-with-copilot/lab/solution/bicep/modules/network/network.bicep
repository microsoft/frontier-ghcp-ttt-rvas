// Network module — VNet, subnets, NSGs

@description('Azure region')
param location string

@description('Project name for resource naming')
param projectName string

@description('Deployment environment')
param environment string

var vnetName = '${projectName}-${environment}-vnet'

// --- Network Security Groups ---
resource webNsg 'Microsoft.Network/networkSecurityGroups@2023-11-01' = {
  name: '${projectName}-${environment}-web-nsg'
  location: location
  properties: {
    securityRules: [
      {
        name: 'AllowHTTP'
        properties: {
          priority: 100
          direction: 'Inbound'
          access: 'Allow'
          protocol: 'Tcp'
          sourcePortRange: '*'
          destinationPortRange: '80'
          sourceAddressPrefix: '*'
          destinationAddressPrefix: '*'
        }
      }
      {
        name: 'AllowHTTPS'
        properties: {
          priority: 110
          direction: 'Inbound'
          access: 'Allow'
          protocol: 'Tcp'
          sourcePortRange: '*'
          destinationPortRange: '443'
          sourceAddressPrefix: '*'
          destinationAddressPrefix: '*'
        }
      }
    ]
  }
}

resource appNsg 'Microsoft.Network/networkSecurityGroups@2023-11-01' = {
  name: '${projectName}-${environment}-app-nsg'
  location: location
  properties: {
    securityRules: [
      {
        name: 'AllowFromWebSubnet'
        properties: {
          priority: 100
          direction: 'Inbound'
          access: 'Allow'
          protocol: 'Tcp'
          sourcePortRange: '*'
          destinationPortRange: '8080'
          sourceAddressPrefix: '10.0.1.0/24'
          destinationAddressPrefix: '*'
        }
      }
    ]
  }
}

resource dbNsg 'Microsoft.Network/networkSecurityGroups@2023-11-01' = {
  name: '${projectName}-${environment}-db-nsg'
  location: location
  properties: {
    securityRules: [
      {
        name: 'AllowPostgreSQLFromApp'
        properties: {
          priority: 100
          direction: 'Inbound'
          access: 'Allow'
          protocol: 'Tcp'
          sourcePortRange: '*'
          destinationPortRange: '5432'
          sourceAddressPrefix: '10.0.2.0/24'
          destinationAddressPrefix: '*'
        }
      }
    ]
  }
}

// --- Virtual Network ---
resource vnet 'Microsoft.Network/virtualNetworks@2023-11-01' = {
  name: vnetName
  location: location
  properties: {
    addressSpace: {
      addressPrefixes: [
        '10.0.0.0/16'
      ]
    }
    subnets: [
      {
        name: 'web-subnet'
        properties: {
          addressPrefix: '10.0.1.0/24'
          networkSecurityGroup: {
            id: webNsg.id
          }
        }
      }
      {
        name: 'app-subnet'
        properties: {
          addressPrefix: '10.0.2.0/24'
          networkSecurityGroup: {
            id: appNsg.id
          }
          delegations: [
            {
              name: 'appServiceDelegation'
              properties: {
                serviceName: 'Microsoft.Web/serverFarms'
              }
            }
          ]
        }
      }
      {
        name: 'db-subnet'
        properties: {
          addressPrefix: '10.0.3.0/24'
          networkSecurityGroup: {
            id: dbNsg.id
          }
          delegations: [
            {
              name: 'postgresqlDelegation'
              properties: {
                serviceName: 'Microsoft.DBforPostgreSQL/flexibleServers'
              }
            }
          ]
        }
      }
    ]
  }
}

// --- Private DNS Zone for PostgreSQL ---
resource privateDnsZone 'Microsoft.Network/privateDnsZones@2020-06-01' = {
  name: '${projectName}.private.postgres.database.azure.com'
  location: 'global'
}

resource dnsVnetLink 'Microsoft.Network/privateDnsZones/virtualNetworkLinks@2020-06-01' = {
  parent: privateDnsZone
  name: '${vnetName}-link'
  location: 'global'
  properties: {
    virtualNetwork: {
      id: vnet.id
    }
    registrationEnabled: false
  }
}

// --- Outputs ---
output vnetId string = vnet.id
output webSubnetId string = vnet.properties.subnets[0].id
output appSubnetId string = vnet.properties.subnets[1].id
output dbSubnetId string = vnet.properties.subnets[2].id
output privateDnsZoneId string = privateDnsZone.id
