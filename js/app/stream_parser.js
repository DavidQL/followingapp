var _ = require('underscore');
var usedTweetIds = [];
var getRandomPeople = function(opts) {
  var people = [opts.tweet.user];
      people.push(
          _.chain(opts.uniqueUsers)
          .reject(function(user) {
            return user.id === opts.tweet.user.id;
          })
          .sample(opts.count) 
          .value()
      );

  return _.map(_.flatten(people), function(person) {
    return {
      screen_name: person.screen_name,
      id: person.id,
      profile_image_url: person.profile_image_url,
      profile_banner_url: person.profile_banner_url
    };
  });
};
var roundDataPresenter = function(opts) {
  var tweet = opts.tweet;
  var people = opts.people;
  return {
    tweet: {
      body: tweet.text,
      date: tweet.created_at,
      author_id: tweet.user.id,
      id: tweet.id
    },
    people: people
  }; 
};

module.exports = function(tweets) {
  var uniqueUsers = 
    _.chain(tweets)
    .map(function(tweet) {
      return tweet.user;
    })
    .uniq(function(user) {
      return user.id;
    });
  var round1 = (function() {
    var randomTweets = _.sample(tweets, 3);

    return randomTweets.map(function(tweet) {
      var people = getRandomPeople({tweet: tweet, uniqueUsers: uniqueUsers, count: 2});
      usedTweetIds.push(tweet.id);
      return roundDataPresenter({tweet: tweet, people: people});
    });
  })();
  var round2 = (function() {
    var randomTweets = 
      _.chain(tweets)
      .reject(function(tweet) {
        return _.contains(usedTweetIds, tweet.id)
      })
      .sample(3)
      .value();

    return randomTweets.map(function(tweet) {
      var people = getRandomPeople({tweet: tweet, uniqueUsers: uniqueUsers, count: 6});
      usedTweetIds.push(tweet.id);
      return roundDataPresenter({tweet: tweet, people: people});
    });
  })();
  var round3 = (function() {
    var randomTweets =
      _.chain(tweets)
      .reject(function(tweet) {
        return _.contains(usedTweetIds, tweet.id)
      })
      .sample(3)
      .value();

    return randomTweets.map(function(tweet) {
      var people = getRandomPeople({tweet: tweet, uniqueUsers: uniqueUsers, count: 6});
      usedTweetIds.push(tweet.id);
      return roundDataPresenter({tweet: tweet, people: people});
    });
  })();

  var round4 = {};

  return {
    round1: round1,
    round2: round2,
    round3: round3,
    round4: round4
  };
};