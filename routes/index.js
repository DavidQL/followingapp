module.exports = function(app) {
  var express = require('express');
  var router = express.Router();

  /* GET home page. */
  return router.get('/', function(req, res) {
    if (req.session.oauthRequestToken && !req.session.profile) {
      app.consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
        if (error) {
          console.log('error', error);
          res.send("Error getting twitter screen name : " + error, 500);
          return;
        }
        req.session.profile = JSON.parse(data);
        res.render('index', { title: 'Express', session: req.session, profile: req.session.profile});
      });
    } else {
      res.render('index', { title: 'Express', session: req.session, profile: req.session.profile});
    }  
  });
};
