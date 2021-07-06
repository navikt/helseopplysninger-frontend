## SMART on FHIR resource puller

Denne applikasjonen laster ned og resolver en ressurs fra en fhir-server. Den
har noe logikk der den sørger for 

1. whiteliste servere
2. å laste ned nødvendige ressurser
3. redusere mengden data
4. Lage en meldingspakke
5. publisere denne meldingspakken på Kafka

