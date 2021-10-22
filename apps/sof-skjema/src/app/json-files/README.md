# Løsning på lagring av questionnaires

## Valg av løsning

* Bruker GUID av `version` og `url` som "primærnøkkel" altså logisk id på FHIR serveren.
* Manuell endring av `version`, bør ha en test som sjekker at man ikke gjør endringer der
  uten å bumpe.
* Bygge integritetssjekk i resource-puller-tjenesten. Noe som betyr at questionnaires må 
  ligge på utsiden av `sof-skjema`.
* Laster opp questionnaires i CI/CN til buckets slik at vi har alle versjoner av skjemaet.
* Automatiserer tester mot dette.

`gs://sof-skjema-definisjoner/Questionnaire/pleiepenger-for-sykt-barn-1.0.1`
`https://storage.googleapis.com/9d9654fc-bea6-43ed-b483-c6939c19747b/Questionnaire/pleiepenger-for-sykt-barn-1.0.1`
```
http://fhir.nav.no/canonical/Questionnaire/pleiepenger-for-sykt-barn|1.0.1
```


## Annet

