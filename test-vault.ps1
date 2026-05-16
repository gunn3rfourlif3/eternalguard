$vaultUrl = "http://localhost:3000/api/vault"

$body = @'
{
    "userId": "16e8b241-b76a-4f05-8f5e-22027ed1fab8",
    "title": "Database Root Password",
    "secret": "Correct-Horse-Battery-Staple-2026",
    "category": "Credentials"
}
'@

try {
    $response = Invoke-RestMethod -Uri $vaultUrl -Method Post -Body $body -ContentType "application/json"
    $response | ConvertTo-Json
} catch {
    $_.Exception.Message
    $_.ErrorDetails.Message
}