# Notat om bruk av bruk av FHIR


## Dummydata for test formål

Legger ved noen greier her for å få testet. Blir
flyttet senere.

Bestillingsappen blir egentlig en `QuestionnaireResponse`-applikasjon.
Dette betyr at når applikasjonen starter så vil man få følgende sider:

### Views
* `/api/QuestionnaireResponse` Ett view som lister `QuestionnaireResponse`s 
der `Patient` og `Practitioner` matcher med det som ligger i FHIR. 
Basert på token returnerer applikasjonen 

* `/api/QuestionnaireResponse/{id}` Draftene av `QuestionnaireResponse` blir
startet av backend. Slik at 



Med dette patternet kan vel egentlig 
