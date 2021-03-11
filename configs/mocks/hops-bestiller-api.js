module.exports = (app) => {
  app.get('/api/user', function(req, res) {
    res.json({
      'name': 'admin',
      'NAVident': '41e67d0b-4235-471f-8d0b-4b884c330280',
    });
  });
};
