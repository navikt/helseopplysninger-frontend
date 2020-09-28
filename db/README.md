

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
