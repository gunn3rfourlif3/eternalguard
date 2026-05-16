$userId = "16e8b241-b76a-4f05-8f5e-22027ed1fab8"
$vaultUrl = "http://localhost:3000/api/vault?userId=$userId"

try {
    $response = Invoke-RestMethod -Uri $vaultUrl -Method Get
    Write-Host "Secrets retrieved successfully!" -ForegroundColor Green
    $response.items | Format-Table id, title, category, content, createdAt
} catch {
    Write-Host "Failed to retrieve secrets" -ForegroundColor Red
    $_.Exception.Message
}