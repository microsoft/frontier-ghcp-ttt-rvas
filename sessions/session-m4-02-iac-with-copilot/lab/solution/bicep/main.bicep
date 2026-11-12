@description('Prefix for every resource name')
param namePrefix string = 'lab'

@description('Azure region')
param location string = 'westeurope'

@description('Address space of the virtual network')
param vnetCidr string = '10.0.0.0/16'

@description('Tags added to every resource')
param tags object = {
  project: 'iac-lab'
  owner: 'training'
}

resource vnet 'Microsoft.Network/virtualNetworks@2023-11-01' = {
  name: '${namePrefix}-vnet'
  location: location
  tags: tags
  properties: {
    addressSpace: {
      addressPrefixes: [vnetCidr]
    }
    subnets: [
      {
        name: '${namePrefix}-private-1'
        properties: { addressPrefix: cidrSubnet(vnetCidr, 24, 0) }
      }
      {
        name: '${namePrefix}-private-2'
        properties: { addressPrefix: cidrSubnet(vnetCidr, 24, 1) }
      }
    ]
  }
}

resource storage 'Microsoft.Storage/storageAccounts@2023-05-01' = {
  name: toLower('${namePrefix}data${uniqueString(resourceGroup().id)}')
  location: location
  tags: tags
  sku: { name: 'Standard_LRS' }
  kind: 'StorageV2'
  properties: {
    allowBlobPublicAccess: false
    minimumTlsVersion: 'TLS1_2'
    supportsHttpsTrafficOnly: true
  }
}

output vnetId string = vnet.id
output storageName string = storage.name
