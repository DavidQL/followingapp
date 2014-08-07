module.exports = function(app) {
  var express = require('express');
  var router = express.Router();

  return router.get('/', function(req, res) {
    if (!req.session.profile) {
      res.redirect('/');
    } else {
      res.render('game', { title: 'Whose Tweet Is It Anyway?', profile: req.session.profile });
    }
  });
};
