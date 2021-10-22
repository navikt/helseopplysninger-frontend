module.exports = {
  Encounter: require('./Encounter.json'),
  Patient: require('./Patient.json'),
  metadata: require('./metadata.json'),
  Practitioner: require('./Practitioner.json'),
  Questionnaire: [
    require('./questionnaires/med-perioder.json'),
    require('./questionnaires/legeerklæring.json'),
  ],
};
