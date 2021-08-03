export const parseAuthHeader = (authHeader: string) => {
  const type = authHeader.substr(0, authHeader.indexOf(' '));
  const credentials = authHeader.substr(authHeader.indexOf(' ') + 1);
  return { type, credentials };
};
