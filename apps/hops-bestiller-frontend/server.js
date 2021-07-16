const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 2023;
const path = require('path');

app.use(express.static('dist'));
[
  "/patient/:patientId",
  "/patient/:patientId/:view",
  "/patient/:patientId/:view/:eventId"
].forEach(route => {
  app.get(route, (req, res) => res.sendFile(path.join(__dirname, 'dist/index.html')));
});

app.listen(port, () => console.log(`Server starting on port ${port}`));
