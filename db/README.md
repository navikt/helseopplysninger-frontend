

Tabellnavn alltid i entall. Små bokstaver
snake_case.


`tableNames.json` inneholder alle tabellnavnene. Dette
er for å enklere kunne se hvor man bruker tabeller. Etter at
applikasjonen er produksjonssatt skal man bare legge til
nye tabellnavn her slik at man ikke brekker migreringer.
Egen test bør skrives på dette.


https://salsita.github.io/node-pg-migrate


Kjøre migrations
```
npm run migrate up
npm run migrate down
npm run migrate redo
```

### FHIR

ser for meg å lagre FHIR ressurser på nøyaktige databasenavn
likt ressursen. Dette gjør det enklere å finne frem. Siden
dette ikke er en generisk greie så er det greit å lage relasjoner
mellom objektene. Da er det lettere å finne frem/debugge. Vi
får da egne tabeller for:

* Patient (kommer fra EPJ eller kontaktregisteret?)
* Practitioner (kommer fra EPJ eller kontaktregisteret?)
* Questionnaire (kommer fra bestillingen)
* QuestionnaireResponse

Spørsmål
* Skal man lage responses fra backend med alt den trenger for
å rendres i frontend? Eller skal frontend til dels lage noen ider
etc? Hvordan skal dette samspillet være?
  - der ressursen lages og la backend bare forholde seg til dette?
  - skal frontend også sette sammen hele responset?
* Skal vi ta i mot FHIR-ressurser, eller skal vi lage ett enklere
API der vi har ferdiglagd items eller hele skjema?
* Skal man bruke `serviceRequest` og pakke disse rundt greiene?


