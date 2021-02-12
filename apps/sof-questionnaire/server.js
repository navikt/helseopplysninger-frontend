const express = require('express');
const app = express();
const port = process.env.PORT || 2022;

app.get('/internal/isAlive', (req, res) => {
  return res.status(200).send('Ok!');
});

app.get('/internal/isReady', (req, res) => {
  return res.status(200).send('Ok!');
});
app.use(express.static('dist'))

app.listen(port, () => {
  console.log(`Server starting on port ${port}`);
});
