$body = @{
    fullName = "Test User"
    email = "test@eternalguard.com"
    securityPin = "123456"
} | ConvertTo-Json

Invoke-RestMethod -Uri "http://localhost:3000/api/register" `
      -Method Post `
      -Body $body `
      -ContentType "application/json"