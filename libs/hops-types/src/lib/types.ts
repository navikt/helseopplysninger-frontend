export type Brukerinfo = {
    innlogget: Boolean;
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
}

export enum BackendPaths {
    CALLBACK_PATH = '/api/oauth2/callback',
    IS_ALIVE_PATH = '/api/internal/is-alive',
    IS_READY_PATH = '/api/internal/is-ready',
    LOGIN_PATH = '/api/oauth2/login',
    PATH = '/api',
    PATIENT_EVENTS = '/api/patient/:patientId/events',
    PATIENT_EVENT = '/api/patient-event/:eventId',
    PATIENT_STATUS_PRESENS = '/api/patient/:patientId/status-presens',
    PROMETHEUS_PATH = '/api/internal/prometheus',
    USER_PATH = '/api/user',
    BESTILLING_PATH = '/api/patient/:patientId/bestillinger'
}
