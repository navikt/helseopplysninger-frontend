export type Brukerinfo = {
  innlogget: boolean;
  navn: string;
  ident: string;
  enhet?: string;
  rolle?: string;
};
export type AccessToken = {
  name?: string;
  NAVident?: string;
  sub?: string;
  jti?: string;
};

export enum BackendPaths {
  BESTILLING_PATH = '/api/patient/:patientId/bestillinger',
  CALLBACK_PATH = '/api/oauth2/callback',
  ITEMS_PATH = '/api/items',
  LOGIN_PATH = '/api/oauth2/login',
  PATH = '/api',
  PATIENT_EVENT = '/api/patient-event/:eventId',
  PATIENT_EVENTS = '/api/patient/:patientId/events',
  PATIENT_STATUS_PRESENS = '/api/patient/:patientId/status-presens',
  USER_PATH = '/api/user',
}
