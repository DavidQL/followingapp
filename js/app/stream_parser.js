var _ = require('underscore');
var $ = require('./../../bower_components/jquery/dist/jquery');

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

var generateRound = function(opts) {
  var randomTweets = 
    _.chain(opts.tweets)
    .reject(function(tweet) {
      return _.contains(usedTweetIds, tweet.id)
    })
    .sample(3)
    .value();

  return randomTweets.map(function(tweet) {
    var people = getRandomPeople({tweet: tweet, uniqueUsers: opts.uniqueUsers, count: opts.peopleCount});
    usedTweetIds.push(tweet.id);
    return {
      tweet: {
        body: tweet.text,
        date: tweet.created_at,
        author_id: tweet.user.id,
        id: tweet.id,
        source: tweet.source,
        readable_source: tweet.readable_source
      },
      people: _.shuffle(people),
      uniqueTweetSources: (function() {
        if (opts.uniqueTweetSources) {
          opts.uniqueTweetSources.push(tweet.readable_source)
          return _.uniq(opts.uniqueTweetSources);
        }
      })()
    }; 
  });
};

module.exports = function(tweets) {
  var tweets = _.map(tweets, function(tweet) {
    return _.extend(tweet, {
      readable_source: $(tweet.source).text()
    });
  });
  var uniqueUsers = 
    _.chain(tweets)
    .map(function(tweet) {
      return tweet.user;
    })
    .uniq(function(user) {
      return user.id;
    });
  var uniqueTweetSources = 
    _.chain(tweets)
    .map(function(tweet) {
      return tweet.readable_source;
    })
    .uniq()
    .sample(5)
    .value();

  var round1 = generateRound({tweets: tweets, peopleCount: 2, uniqueUsers: uniqueUsers});
  var round2 = generateRound({tweets: tweets, peopleCount: 6, uniqueUsers: uniqueUsers});
  var round3 = generateRound({tweets: tweets, peopleCount: 6, uniqueUsers: uniqueUsers});
  var round4 = generateRound({tweets: tweets, peopleCount: 6, uniqueUsers: uniqueUsers, uniqueTweetSources: uniqueTweetSources});

  return {
    round1: round1,
    round2: round2,
    round3: round3,
    round4: round4
  };
};