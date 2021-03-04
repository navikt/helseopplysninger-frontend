import axios from 'axios';
import utils from './utils';

const getUserInfoFromGraphApi = (authClient, req) => {
  return new Promise(((resolve, reject) => {
    const clientId = 'https://graph.microsoft.com'
    const scope = 'https://graph.microsoft.com/.default';
    const query = 'onPremisesSamAccountName,displayName,givenName,mail,officeLocation,surname,userPrincipalName,id,jobTitle';
    const graphUrl = `https://graph.microsoft.com/v1.0/me?$select=${query}`;
    utils.getOnBehalfOfAccessToken(authClient, req, clientId, scope)
    .then(accessToken => axios.get(graphUrl, { headers: {"Authorization": `Bearer ${accessToken}`} }))
    .then(response => resolve(response.data))
    .catch(err => {
      if (err.response.data) reject(err.response.data)
      else reject(err)
    })
  }))
};

export default {
  getUserInfoFromGraphApi,
};
