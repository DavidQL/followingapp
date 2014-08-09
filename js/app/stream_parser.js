var _ = require('underscore');


module.exports = function(tweets) {
  var uniqueUsers = _.uniq(tweets.map(function(tweet) {
      return tweet.user;
    }), function(user) {
      return user.id;
    });
  var randomTweets = _.sample(tweets, 3);
  var round1 = randomTweets.map(function(tweet) {
      var people = [tweet.user];
      people.push(
          _.chain(uniqueUsers)
          .reject(function(user) {
            return user.id === tweet.user.id;
          })
          .sample(2) 
          .value()
      );

      return {
        tweet: {
          body: tweet.text,
          date: tweet.created_at,
          author_id: tweet.user.id
        },
        people: _.map(_.flatten(people), function(person) {
          return {
            screen_name: person.screen_name,
            id: person.id,
            profile_image_url: person.profile_image_url
          };
        })
      };
    });
  var round2 = {};
  var round3 = {};
  var round4 = {};

  return {
    round1: round1,
    round2: round2,
    round3: round3,
    round4: round4
  };
};