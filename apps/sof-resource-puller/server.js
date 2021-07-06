const express = require('express');
const app = express();
const port = process.env.SERVER_PORT || 2022;

app.get('/resource-puller/internal/health', (req, res) => res.status(200).send('Ok!'));
app.use(express.static('dist'));
app.listen(port, () => console.log(`Server starting on port ${port}`));
