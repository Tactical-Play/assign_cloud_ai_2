param (
[Parameter (Mandatory=$True,Position=0)]
[string]$id,
[Parameter (Mandatory=$True,Position=1)]
[string]$fp,
[Parameter (Mandatory=$True,Position=2)]
[string]$blob,
[Parameter (Mandatory=$True,Position=3)]
[string]$cont
)
$ctx = New-AzStorageContext -StorageAccountName $id -UseConnectedAccount
New-AzStorageContainer -Name $cont -Permission Blob -context $ctx

$Blob1HT = @{
    File             = $fp
    Container        = $cont
    Blob             = $blob
    Context          = $ctx
    StandardBlobTier = 'Hot'
  }
Set-AzStorageBlobContent @Blob1HT

 
