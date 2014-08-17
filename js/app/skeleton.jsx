var React = require('./../../bower_components/react/react-with-addons');
var $ = require('./../../bower_components/jquery/dist/jquery');
var streamParser = require('./stream_parser');
var RoundCounter = require('./round_counter.jsx');
var Timer = require('./timer.jsx');
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
          round4: [{
            tweet: {},
            people: [{}, {}, {}]
          }]
        },
        round: 4,
        gameOver: false,
        score: 0
      };
    },

    advanceRound: function() {
      // TODO: add points for advancing rounds
      this.setState({
        game_data: this.state.game_data,
        round: this.state.round + 1,
        score: this.state.score + (this.state.round * this.state.round * 100)
      });
    },

    reportGameOver: function(opts) {
      this.setState({
        gameOver: true,
        won: opts.won
      });
    },

    reportSecondsLeft: function(seconds) {

    },

    receiveScore: function(score) {
      this.setState({
        score: score
      });
    },

    render: function() {
      var game_over_message = this.state.gameOver && this.state.won ? "You won!" : "Game over. You lose";
      return (
        <div>
          <RoundCounter round={this.state.round}/>

          {
            (function() {
              if (this.state.gameOver) {
                return <div>{game_over_message}, score: {this.state.score} </div>
              } else {
                return (
                  <div>
                    <span className="score">Score: {this.state.score}</span>
                    <Timer reportSecondsLeft={this.reportSecondsLeft} />
                    <Question game_data={this.state.game_data} round={this.state.round} advanceRound={this.advanceRound} reportGameOver={this.reportGameOver}/>
                  </div>
                );
              }
            }.bind(this))()
          }
        </div>
      );
    }
});
