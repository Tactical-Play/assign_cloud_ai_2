param (
[Parameter (Mandatory=$True,Position=0)]
[string]$id,
[Parameter (Mandatory=$True,Position=1)]
[string]$blob,
[Parameter (Mandatory=$True,Position=2)]
[string]$cont
)
$ctx = New-AzStorageContext -StorageAccountName $id -UseConnectedAccount
(Get-AzStorageBlob -blob $blob -Container $cont -context $ctx).ICloudBlob.uri.AbsoluteUri