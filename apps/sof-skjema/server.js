const express = require('express');
express.Router({strict: true});
const app = express();
const port = process.env.SERVER_PORT || 2022;
const index = (req, res) => res.sendFile(require('path').join(__dirname, 'dist/index.html'));
app.use(express.static('dist'));
app.get('/skjema/:questionnaireType', index);
app.use((req, res, next) => {
  if (req.path.substr(-1) === '/' && req.path.length > 1) {
    res.redirect(301, req.path.slice(0, -1) + req.url.slice(req.path.length));
  } else {
    next();
  }
});
app.listen(port, () => console.log(`Server starting on port ${port}`));
