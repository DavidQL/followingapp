var oauth = require('oauth');
var passport = require('passport');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(opts) {
  passport.use(new FacebookStrategy({
      clientID: opts.keys.facebookAppId,
      clientSecret: opts.keys.facebookAppSecret,
      callbackURL: opts.keys.env === "development" ? "http://127.0.0.1:3000/sessions/callback" : "http://followingapp.herokuapp.com/sessions/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOrCreate(..., function(err, user) {
        if (err) { return done(err); }
        done(null, user);
      });
    }
  ));

  opts.app.get('/sessions/connect',passport.authenticate('facebook', { scope: 'read_stream' }));
   
  opts.app.get('/sessions/callback', passport.authenticate('facebook', { 
    successRedirect: '/game',
    failureRedirect: '/login' 
  });
};