const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 2023;
const index = (req, res) => res.sendFile(require('path').join(__dirname, 'dist/index.html'));
app.use(express.static('dist'));
app.get('/patient/:patientId', index);
app.get('/patient/:patientId/:view', index);
app.get('/patient/:patientId/:view/:eventId', index);
app.listen(port, () => console.log(`Server starting on port ${port}`));
