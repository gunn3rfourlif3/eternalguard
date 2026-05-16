$loginUrl = "http://localhost:3000/api/login"
$body = @{
    email    = "testuser@example.com"  # Use the email you just registered
    password = "YourPassword123"       # Use the password you used in test-reg.ps1
} | ConvertTo-Json

try {
    $response = Invoke-WebRequest -Uri $loginUrl -Method Post -Body $body -ContentType "application/json" -SessionVariable sess
    $content = $response.Content | ConvertTo-Json
    Write-Host "Login successful!" -ForegroundColor Green
    $response.Content
} catch {
    Write-Host "Login failed!" -ForegroundColor Red
    $_.Exception.Message
    $_.ErrorDetails.Message
}