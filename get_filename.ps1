param (
[Parameter (Mandatory=$True,Position=0)]
[string]$id,
[Parameter (Mandatory=$True,Position=0)]
[string]$cont
)
$ctx = New-AzStorageContext -StorageAccountName $id -UseConnectedAccount
(Get-AzStorageBlob -Container $cont -Context $ctx).Name