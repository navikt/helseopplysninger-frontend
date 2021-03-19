export type StatusPresensStatus = {
    type: string;
    navn: string;
    endret: string;
}

export type StatusPresensDiagnoser = {
    id: string;
    type: string;
    tekst: string;
    endret: string;
}

export type StatusPresensOpplysninge = {
    id: string;
    type: string;
    states: StatusPresensOpplysningerState[]
}

export type StatusPresensOpplysningerState = {}

export type StatusPresens = {
    status: StatusPresensStatus;
    diagnoser: StatusPresensDiagnoser;
    opplysninger: StatusPresensOpplysninge[];
};

export type PatientEvent = {
    id: string;
    periode: [];
    type: {
        tekst: string;
        icon: PatientEventIcon;
    }
    icon: string;
    status: {
        type: "suksess" | "info" | "advarsel" | "fokus",
        tekst: string,
    };
}

export  type PatientEventIcon = "Bandage" | "Information" | "DialogDots" | "Law" | "FileContent"
