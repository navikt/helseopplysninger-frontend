import { JSONWebKey, JWK, JWKRSAKey } from 'jose';
import * as NodeRSA from 'node-rsa';

const parseXMLKeyComponents = function (key) {
  let encXMLKey = key.trim();
  const encoding = 'base64';

  if (!encXMLKey.startsWith('<')) encXMLKey = new Buffer(key, encoding).toString('utf8');

  return {
    n: new Buffer(encXMLKey.match(/<Modulus>([^<].*)<\/Modulus>/)[1], encoding),
    e: 65537,
    d: new Buffer(encXMLKey.match(/<D>([^<].*)<\/D>/)[1], encoding),
    p: new Buffer(encXMLKey.match(/<P>([^<].*)<\/P>/)[1], encoding),
    q: new Buffer(encXMLKey.match(/<Q>([^<].*)<\/Q>/)[1], encoding),
    dmp1: new Buffer(encXMLKey.match(/<DP>([^<].*)<\/DP>/)[1], encoding),
    dmq1: new Buffer(encXMLKey.match(/<DQ>([^<].*)<\/DQ>/)[1], encoding),
    coeff: new Buffer(encXMLKey.match(/<InverseQ>([^<].*)<\/InverseQ>/)[1], encoding),
  };
};
export const xmlRsaKeyToJwk = (xmlKeyComponents): JSONWebKey => {
  const components = parseXMLKeyComponents(xmlKeyComponents);
  const key = new NodeRSA();
  key.importKey(components, 'components');
  const privateKey = key.exportKey('private');
  const jwkKey = JWK.asKey(privateKey);
  return jwkKey.toJWK(true) as JSONWebKey;
};
