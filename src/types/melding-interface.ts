export interface MeldingsInterface {
    id: string;
    type: 'TERMINBEKREFTELSE' | 'LEGEERKLÆRING' | 'SOMETHINGELSE';
    fristDato: string;
    lanuage: 'NO' | 'EN';
    brukerNavn: string;
    brukerIdent: string;
    journalfoert: boolean;
    journalfoertDato?: string;
    behandlerId: string;
    sendtInn: boolean;
    sendtInnDato?: string;
    opprettet: string;
    oppdatert: string;
    helseopplysninger: OpplysningInterface[]
}

export interface OpplysningInterface {
    type: 'DIAGNOSE' | 'DATO' | 'FRITEKST' | 'TALL' | 'ALTERNATIVER' | 'FNUMMER';
    verdi: string;
    defaultVerdi: string;
    rekkefolge: number;
    gruppering?: string;
    alternativer?: AlternativeInterface[];
    hjelpetekst: string;
    hjelpelenke: string;
}

export interface AlternativeInterface {
    verdi: string;
    tittel: string;
    rekkefolge: number;
}
