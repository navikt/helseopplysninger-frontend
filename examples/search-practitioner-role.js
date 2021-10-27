const { search } = require('./fkr');

search('PractitionerRole', {
  'practitioner.identifier': '13065906141'
}).then(rs => {
  if (rs.entry) {
    rs.entry.forEach(entry => {
      console.log(JSON.stringify(entry.resource, null, 2));
    });
  }
}).catch(error => {
  console.error(error.message);
});


