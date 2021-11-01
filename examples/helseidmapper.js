const secret = require('./secrets.helseid.json');
Object.keys(secret).forEach(key => {
  const value = Array.isArray(secret[key]) ? secret[key].join(' ') : secret[key];
  console.log('HELSEID_' + key.toUpperCase() + ':', value);
});
