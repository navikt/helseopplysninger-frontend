export interface BestillingInterface {
    id: string;
    type: string;
    fristDato: Date;
    language: 'NO' | 'EN';
    journalfoert: boolean;
    sendtInn: boolean;
    behandler: AktoerInterface;
    bestiller: AktoerInterface;
    bruker: AktoerInterface;
    hendelser: HendelseInterface[];
    opplysninger: OpplysningInterface[];
    opprettet: Date;
    oppdatert: Date;
}

export interface AktoerInterface {
    id: string;
    navn: string;
    ident: string;
    opprettet: Date;
    oppdatert: Date;
}

export interface OpplysningInterface {
    id: string;
    type: 'DIAGNOSE' | 'DATO' | 'FRITEKST' | 'TALL' | 'ALTERNATIVER' | 'FNUMMER';
    verdi: string;
    hjelpetekst: string;
    hjelpelenke: string;
    opprettet: Date;
    oppdatert: Date;
}

export interface HendelseInterface {
    id: string;
    dato: Date;
    status: "OPPRETTET" | "SENDT_INN" | "OPPDATERT" | "JOURNALFOERT";
    aktoer: AktoerInterface;
}

export interface AlternativeInterface {
    verdi: string;
    tittel: string;
    rekkefolge: number;
}
