module.exports = function(app) {
  var express = require('express');
  var router = express.Router();

  router.get('/', function(req, res) {
    if (req.session.profile) {
      res.redirect('/game');
    } else {
      res.render('index', { title: 'Following'});
    }
  });

  router.get('/logout', function(req, res) {
    req.session.destroy(function(err) {
      res.redirect('/');
    });
  });

  return router;
};
