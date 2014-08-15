var React = require('./../../bower_components/react/react-with-addons');
var $ = require('./../../bower_components/jquery/dist/jquery');
var streamParser = require('./stream_parser');
var RoundCounter = require('./round_counter.jsx');
var Question = require('./question/index.jsx');

module.exports = React.createClass({
    componentDidMount: function() {
      $.get('/tweets')
        .done(function(tweets) {
          this.setState({
            game_data: streamParser(tweets),
            round: this.state.round
          });
        }.bind(this))
        .fail(function(error) {
          console.err('Error fetching tweets');
        });
    },

    getInitialState: function() {
      return {
        game_data: {
          round1: [{
            tweet: {},
            people: [{}, {}, {}]
          }],
          round2: [{
            tweet: {},
            people: [{}, {}, {}]
          }],
          round3: [{
            tweet: {},
            people: [{}, {}, {}]
          }],
        },
        round: 1
      };
    },

    advanceRound: function() {
      this.setState({
        game_data: this.state.game_data,
        round: this.state.round + 1
      });
    },

    render: function() {
      return (
        <div>
          <RoundCounter round={this.state.round}/>
          <Question game_data={this.state.game_data} round={this.state.round} advanceRound={this.advanceRound}/>
        </div>
      );
    }
});
