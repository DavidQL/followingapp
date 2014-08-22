module.exports = function(app) {
  var express = require('express');
  var router = express.Router();
  var sample_tweets = false; require('../sample-tweets');

  return router.get('/', function(req, res) {
    if (sample_tweets) {
      res.send(sample_tweets);
    }
    else if (req.session.tweets) {
      res.send(req.session.tweets);
    } else {
      app.consumer.get("https://api.twitter.com/1.1/statuses/home_timeline.json?count=200", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
        req.session.tweets = JSON.parse(data);
        res.send(req.session.tweets);
      });
    }
  });
};
