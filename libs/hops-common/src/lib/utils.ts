export const isOnNais = (): boolean => {
    return !!(process.env.NAIS_APP_NAME &&
        process.env.NAIS_NAMESPACE &&
        process.env.NAIS_APP_IMAGE);
}
