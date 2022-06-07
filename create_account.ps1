param (
[Parameter (Mandatory=$True,Position=0)]
[string]$id
)
Connect-AzAccount -Tenant e9b0bc35-255b-41c0-969b-897fa186f6d9
$resourceGroup = "coalfield"
$location = "centralindia"

#New-AzResourceGroup -Name $resourceGroup -Location $location
try{
    New-AzStorageAccount -ResourceGroupName $resourceGroup -Name $id -Location $location -SkuName Standard_LRS -Kind StorageV2
}
catch {
    {$_.Exception.Message}
}