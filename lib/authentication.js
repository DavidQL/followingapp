var oauth = require('oauth');

module.exports = function(opts) {
  // Get your credentials here: https://dev.twitter.com/apps
  var _twitterConsumerKey = opts.keys._twitterConsumerKey;
  var _twitterConsumerSecret = opts.keys._twitterConsumerSecret;
  var callbackURL = opts.keys.env === "development" ? "http://127.0.0.1:3000/sessions/callback" : "http://followingapp.herokuapp.com/sessions/callback";
  
  opts.app.consumer = new oauth.OAuth(
      "https://twitter.com/oauth/request_token", "https://twitter.com/oauth/access_token", 
      _twitterConsumerKey, _twitterConsumerSecret, "1.0A", callbackURL, "HMAC-SHA1");

  opts.app.get('/sessions/connect', function(req, res){
      opts.app.consumer.getOAuthRequestToken(function(error, oauthToken, oauthTokenSecret, results){
      if (error) {
        res.send("Error getting OAuth request token : " + error, 500);
      } else {  
        req.session.oauthRequestToken = oauthToken;
        req.session.oauthRequestTokenSecret = oauthTokenSecret;
        res.redirect("https://twitter.com/oauth/authorize?oauth_token="+req.session.oauthRequestToken);      
      }
    });
  });
   
  opts.app.get('/sessions/callback', function(req, res){
    opts.app.consumer.getOAuthAccessToken(req.session.oauthRequestToken, req.session.oauthRequestTokenSecret, req.query.oauth_verifier, function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
      if (error) {
        console.log("Error",error,oauthAccessToken,oauthAccessTokenSecret,results,500);
        res.send("Error getting OAuth access token : " + error + "["+oauthAccessToken+"]"+ "["+oauthAccessTokenSecret+"]"+ "["+results+"]", 500);
      } else {
        req.session.oauthAccessToken = oauthAccessToken;
        req.session.oauthAccessTokenSecret = oauthAccessTokenSecret;

        opts.app.consumer.get("https://api.twitter.com/1.1/account/verify_credentials.json", req.session.oauthAccessToken, req.session.oauthAccessTokenSecret, function (error, data, response) {
          if (error) {
            console.log('error', error);
            res.send("Error getting twitter screen name : " + error, 500);
            return;
          }
          req.session.profile = JSON.parse(data);
          res.redirect('/game');
        });
      }
    });
  });
};