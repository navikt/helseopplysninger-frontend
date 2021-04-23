# Bestiller backend
Backend for bestillerappen.

## Manuell testing
Å for å teste grensesnittet for å semde bestillinger.
```
fetch('/api/patient/123/bestillinger', {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({purpose:"something",items:["004b4844-994c-11eb-a8b3-0242ac130003"]})
  })
```
