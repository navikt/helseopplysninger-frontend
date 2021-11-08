const secret = require('./secrets.helseid_local.json');

const snakeCase = (elem) => elem.replace(/[A-Z][^A-Z]/g, '_$&').toUpperCase();

Object.keys(secret).forEach((key) => {
  const value = Array.isArray(secret[key]) ? secret[key].join(' ') : secret[key];
  console.log('HELSEID_' + snakeCase(key) + '="' + value + '"');
});
