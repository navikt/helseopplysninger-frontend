export type StatusPresensStatus = {
  type: string;
  navn: string;
  endret: string;
};

export type StatusPresensDiagnose = {
  id: string;
  type: string;
  tekst: string;
  endret: string;
};

export type StatusPresensOpplysning = {
  id: string;
  type: string;
  states: StatusPresensOpplysningerState[];
};

export type StatusPresensOpplysningerState = {
  parent?: string;
  tekst: string[];
  endret: string;
};

export type StatusPresens = {
  status: StatusPresensStatus;
  diagnoser: StatusPresensDiagnose[];
  opplysninger: StatusPresensOpplysning[];
};

export type PatientEvent = {
  id: string;
  periode: [];
  type: {
    tekst: string;
    icon: PatientEventIcon;
  };
  icon: string;
  status: {
    type: 'suksess' | 'info' | 'advarsel' | 'fokus';
    tekst: string;
  };
};

export type PatientEventIcon =
  | 'Bandage'
  | 'Information'
  | 'DialogDots'
  | 'Law'
  | 'FileContent';
