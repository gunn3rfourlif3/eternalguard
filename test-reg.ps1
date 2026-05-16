$body = @'
{
    "fullName": "Test User",
    "email": "vernon6@eternalguard.com",
    "securityPin": "1234567"
}
'@

Invoke-RestMethod -Uri "http://localhost:3000/api/register" `
      -Method Post `
      -Body $body `
      -ContentType "application/json"