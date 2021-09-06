# SOF - Smart On FHIR

I dette prosjektet lages en SMART on FHIR applikasjon, som skal kunne brukes av ulike elektroniske pasientjournaler i Norge. 
Gjennom applikasjonen vil leger kunne fylle ut og sende ulike skjemaer til NAV. Blant skjemaene som brukes er "Legeerklæring: 
pleiepenger for sykt barn".

# Komme i gang

1. Klon prosjektet.
2. Naviger til prosjektet **sof** i terminalen og kjør `npm install` for å laste ned nødvendige pakker.
3. For å kjøre frontend, skriv `npm start` i terminalen.
4. For å teste applikasjonen i en EPJ, gå inn på https://launch.smarthealthit.org/. Der velger du en pasient (Patient) og 
5. en lege (Provider), fyller inn URLen hvor frontend applikasjonen kjører (hvis lokalt: http://localhost:4200), og 
6. trykker «Launch App!».
7. For å kjøre alle tester, skriv `npm test` i terminalen.

## Praktisk info

- **URL**: https://sof.ekstern.dev.nav.no (eksternt), http://localhost:4200 (lokalt)
- **Teknologier**: React m/ TypeScript, FHIR
- **Språk**: Koden er hovedsaklig skrevet på engelsk
- **Design**: Så langt det lar seg gjøre har vi fulgt NAV sine retningslinjer for design og utforming. 
              Mer informasjon [her](https://design.nav.no).

# Oppstart av prosjektet

Prosjektet ble lagd ved å bruke [Nx](https://nx.dev), som gir flere verktøy, biblioteker ol. Blant annet gjorde nx det 
lett å lage en react applikasjon ved å kjøre `nx g @nrwl/react:app my-app`.

# FHIR

## Lage et _Questionnaire_

Når man lager nye skjemaer må man følge noen standarder for at koden skal virke som forventet. For det første må man 
følge standarden til Questionnaire ressursen som oppgitt hos [FHIR](https://hl7.org/fhir/questionnaire.html). I tillegg 
må følgende overholdes for at skjemaet skal rendres som ønsket:

- **LinkID**: Et items linkId må være unikt. Hvis itemet representerer en hjelpetekst må verdien til linkId være på 
følgende format: "idNumber-help", hvor -help gjør at det dukker opp som hjelpetekst i stedet for et spørsmål. 
Hjelpeteksten legges da inn som et item i hovedspørsmålet. Om svaret på et spørsmål skal hentes automatisk fra en 
FHIR server (som f.eks. pasientens navn og fødselsnummer), skriv verdien til linkId på følgende 
format: "idNumber-automatic".

- **Typer**: Alle spørsmål i et Questionnaire har et type-felt. Applikasjonen bruker typen til å velge hvilken type 
input som skal rendres, og har for øyeblikket støtte for følgende:

    - `string`: Rendrer et inputfelt med pull-down-meny og lar deg skrive/velge flere svar.
    - `text`: Rendrer et vanlig tekst felt.
    - `choice`: Rendrer radio knapper med svaralternativer som lagt inn i answerOption.
    - `date`: Rendrer en dato-velger.
    - `display`: Brukes for å rendre items som ikke skal ha et svar, f.eks. hjelpetekst og hvert enkelt alternativ i en 
       radio gruppe.
    - `group`: Støtter for øyeblikket at en group inneholder svaralternativ til checkbokser eller flere spørsmål av 
       typen date.

- **Status**: For at et Questionnaire skal lagres til serveren må statusen være `active`. Dette hindrer at uferdige 
  skjemaer lagres.

- **Nivåer**: Det er for øyeblikket kun støtte for to nivåer i et nøstet objekt, f.eks. å ha spørsmål 2 og spørsmål 2.x.

- **Rekkefølge**: Nå er ikke rekkefølgen på spørsmålene avhengig av linkId, det er bare rekkefølgen i json-filen til 
  Questionnaire som bestemmer dette.

## Lage et _QuestionnaireResponse_
QuestionnaireResponse brukes for å samle inn og registrere svar fra et Questionnaire. Per nå er det kun ett 
QuestionniareResponse per spørreskjema (Questionnaire) og per pasient (Patient). Om det ligger flere påbegynte 
QuestionnaireResponse på serveren vil den eldste versjonen vises, siden det i teorien ikke skal være mulig med flere.

Videre må man følge standarden til QuestionnaireResponse-ressursen som oppgitt hos 
[FHIR](https://hl7.org/FHIR/questionnaireresponse.html). I tillegg må følgende overholdes for at skjemaet skal lagres 
som ønsket:

- **Questionnaire**: Hvert QuestionnaireResponse er knyttet til et bestemt Questionniare, og er på formatet `Questionnaire/`_`id`_, der _id_ er den unike id-en til tilhørende Questionnaire.
- **Subject**: Refererer til pasienten (Patient) som informasjonen handler om. Det brukes for å knytte QuestionnaireResponse til en spesifikk pasient (Patient), hvor id-en er på formatet `Patient/`_`id`_. På sikt er det ønskelig å bruke pasientens (unike) norske fødselsnummer.
- **Source**: Referer til personen som fyller ut spørreskjema, ofte en lege eller andre autoriserte helsepersonell (Practitioner). Id-en er på formatet `Practitioner/`_`id`_. På sikt er det ønskelig å bruke legens (unike) HPR-nummer.
- **Status**: Sier noe om prosessen til et QuestionnaireResponse.
    - `in-progress` (default): Tilsvarer at "Lagre"-knappen hos [DIPS[1]](#lagring-og-sending-av-skjema-fra-dips-til-nav) er trykket på, dvs. at skjemaet delvis utfylt og kan endres på om ønskelig.
    - `completed`: Tilsvarer at "Godkjenn"-knappen hos [DIPS[2]](#lagring-og-sending-av-skjema-fra-dips-til-nav) er trykket på. Dette hindrer at ferdigutfylte skjemaer endres på.
- **LinkId**: Hvert item må ha en unik linkId, i tillegg må det samsvare med linkId i den tilhørende Questionnaire.
    - **Sub spørsmål** (eksempel 1.x): Om et spørsmål har flere subspørsmål må man legge til et item for svar på hvert av subspørsmålene i QuestionnaireResponse filen.

## Legge til ny Questionnaire og QuestionnaireResponse

For å legge til et nytt Questionnaire/QuestionnaireResponse slik at skjemaet kan fylles ut må følgende gjøres:

1. Opprette JSON-filene for Questionnaire og QuestionnaireResponse med formatet beskrevet under [Lage et _Questionnaire_](#lage-et-questionnaire) og [Lage et _QuestionnaireResponse_](#lage-et-questionnaireresponse).
2. Lage en ny link til skjemaet i [LandingPage.tsx](./src/app/components/LandingPage.tsx). Pass på at navnet bak `../skjema/` er likt `name`-verdien i json filen.
3. Legge til støtte for nytt Questionnaire og QuestionnaireResponse i `chooseQuestionnaire`-metoden i [setQuestionnaireContext.ts](./src/app/utils/setQuestionnaireContext.ts).

# Valg om lagring og oppdatering av Questionnaire og QuestionnaireResponse

Underveis er det tatt noen valg om når man skal lagre/hente/opprette nye Questionnaire- og QuestionnaireResponse-ressurser. Nå fungerer dette på følgende måte:

- Når man skal få opp et Questionnaire sjekkes det først om en Questionnaire-ressurs med korrekt navn og versjon som har status `active` finnes i serveren fra før av. Hvis det finnes brukes denne Questionnaire ressursen. Vi har valgt å hente Questionnaire fra serveren i stedet for å bare bruke JSON-filen fordi hver QuestionnaireResponse må kobles mot et Questionnaire som finnes i serveren. Om man ikke finner et Questionnaire i serveren, men JSON-filen som brukes har status active, blir denne lagret til serveren og brukt. Hvis status ikke er `active` blir den ikke lagret til serveren, men JSON-filen brukes allikevel.
- Når man åpner et Questionnaire prøver applikasjonen å hente tidligere svar fra serveren og fylle ut dette, så man slipper å skrive det inn på nytt. Når den leter etter en QuestionnaireResponse å bruke sjekker den om subject verdien matcher pasient-id, at det svarer på rett Questionnaire, og at statusen er `in-progress`.
- Når man lagrer til serveren sjekkes det først om det finnes en QuestionnaireResponse som er `in-progress` på rett pasient og som tilhører rett Questionnaire. Om dette eksisterer oppdateres denne ressursen. Om det ikke eksisterer lages en ny resssurs. Dette vil si at det ikke skal være mulig å ha flere svar på samme Questionnaire på én pasient.
- Når man skal sende inn skjemaet til NAV må QuestionnaireResponsen først være lagret i serveren. Deretter sendes skjemaet (POST) til `../resource-puller/pull-resource`, hvor .. er roten til applikasjonen (se URL i [Praktisk info](#praktisk-info)), som legger skjemaet i Kafka-køen til NAV.

# Samarbeid med DIPS

Parallelt med dette prosjektet har sommerstudenter hos DIPS jobbet med å implementere en Smart on FHIR-applikasjon i DIPS Arena. Det er fortsatt mye usikkerheter rundt hvordan dette prosjektet skal integreres med DIPS sine systemer, men følgende avsnitter oppsummerer våre tanker.

## DIPS Arena

Vår skjema-applikasjonen ser slik ut hos DIPS Arena

![Skjemaet på DIPS Arena](./src/assets/DIPS.png?raw=true)

## LandingPage

Per nå brukes [LandingPage.tsx](./src/app/components/LandingPage.tsx) til å ha oversikt over mulige legeerklæringsskjemaer som legene/helsepersonell kan fylle ut og sende til NAV. DIPS har uttrykt et ønske om at navigasjon foregår via deres applikasjon, hvor hvert skjema legges inn som et dokument i deres system. De ønsker dette fordi det er slik legene normalt bruker DIPS, og de vil ikke å bryte med dette.

<!--Det er usikkert om det er behov for en slik side på sikt, siden det kan være ønskelig å trykke seg direkte til NAV-skjemaene via de aktuelle EPJ-ene.-->

## Lagring og sending av skjema fra DIPS til NAV

Det er noe usikkerhet rundt bruk av knapper i skjemaet og i DIPS Arena, siden man ønsker å sikre en god brukeropplevelse. På DIPS Arena finnes det fra før av en egen "Lagre"-knapp[1] og en "Godkjenn"-knapp[2] som er standard for alle "Dokumenter" i EPJ-en. Det er ønskelig at "Lagre"-knappen hos DIPS skal integreres med nåværende "Lagre"-knapp i skjemaet, slik at helsepersonell slipper å forholde seg til forskjellige knapper. Samtidig bør lagremuligheten være såpass generisk at skjemaapplikasjonen kan brukes hos andre EPJ-er.

Det har også vært diskutert om hvordan man skal tydeliggjøre at skjemaet sendes til NAV når det er ferdigstilt. Tanken om en egen "Send til NAV"-knapp hos DIPS kan være aktuelt, men samtidig vil det bryte med standard Dokument-visning hos DIPS, i tillegg til at man da hardkoder en knapp hos en spesifikk EPJ. Eventuelt er det også mulig med en egen "Send til NAV"-knapp som en del av skjemaet, slik det er nå.

[1]: "Lagre"-knapp (DIPS) brukes for mellomlagring eller uferdige skjemaer som skal fullføres senere.

[2]: "Godkjenn"-knapp (DIPS) brukes for å si at skjemaet er ferdig utfylt og det er ikke lenger mulig å endre på det.

### npm-pakke fra DIPS

Sommerstudenter hos DIPS har laget en egen npm-pakke for å håndtere lagring av skjema ved bruk av "Lagre"-knappen på DIPS Arena. Inni npm-pakken ligger det en funksjon `onSave` (som per nå er tom) som kan brukes for å legge inn logikk for hva som skjer når man lagrer skjemaet. Den har ikke blitt testet ut i praksis, og vet derfor ikke om det funker helt riktig, men funksjonene i pakken funker til tross for import-feilmeldinger.

- For å få tak i npm-pakken skriver man `npm install dipssmartonfhirextensions` i terminalen.
- Deretter importerer man ved å skrive `import { dipsExtensions } from 'dipssmartonfhirextensions/index.js';` i ønsket fil. Her kan det være aktuelt å bruke [saveToServer.ts](./src/app/utils/saveToServer.ts)-filen, som håndterer lagring av svarene fra skjemaet.
- For å teste om det er mulig å bruke funksjonene i npm-pakken kan man skrive `dipsExtensions.message = 'bla bla'; console.log(dipsExtensions.message);`, som forhåpentligvis vil returnere "bla bla" i konsollen.

# Veien videre

For det første har vi skrevet kommentarer med `TODO` noen steder i koden. Dette er steder hvor vi vet at noe er feil eller at funksjonalitet burde legges til. Noen feil som burde fikses er:

- Når man går inn på et Questionnaire og det allerede er lagret en respons på den pasienten, skal feltene fylles ut med responsen som er hentet. Vi får hentet og lagret responsen i `answers`-tilstanden, men problemet er at dette skjer asynkront. Altså rendres input-feltene før `answers` er oppdatert, og de gamle svarene vises ikke. Man kan også se at hvis man går inn på et skjema fra [landing-page](./src/app/components/LandingPage.tsx), går ut igjen, og deretter inn igjen på samme skjema, så dukker svarene opp. Feilen medfører også at om du går inn på et skjema og deretter bytter til et annet, vil svarene fra det første skjemaet vises i de nye inputene.
- Gjøre så checkboksene og datofeltene oppdateres og får rett synlig verdi når man har hentet data fra serveren.
- Ordne så man får feilmelding om et spørsmål med DateItem er obligatorisk, men at man ikke har fyllt ut noe.
- Vurdere om det skal være mulig å sende inn en QuestionnaireResponse, selv om ikke alle obligatoriske felter er fylt ut. For øyeblikket er det mulig å gjøre, og man får da bare beskjed om at noe mangler.
- I fremtiden kan det være nødvendig å legge til støtte for å legge til f.eks. flere datoer/dato par. Et eksempel kan være om man skal oppgi flere innleggelser. Vi ser for oss at dette kan løses ved å ha en knapp for å legge til svar, og at man får en liste med alle svarene hvor man da kan slette elementer. Funksjonaliteten er delvis støttet, men noen endringer må da gjøres i [DateItem](./src/app/components/items/DateItem.tsx) og [DatepickerItem](./src/app/components/items/DatepickerItem.tsx). Man trenger en "Legg til"-knapp, og arrayIndex må oppdateres rett.

Ellers burde man fortsette å se på designet/utformingen av applikasjonen. Hvordan få frem at applikasjonen er en del av NAV? Hvilke spørsmål skal man stille? Kan man minke antallet fritekst felt?

# Henvendelser

Spørsmål knyttet til koden eller prosjektet kan stilles som issues her på GitHub.

# For NAV-ansatte

Interne henvendelser kan sendes via Slack i kanalen #team-helseopplysninger.
