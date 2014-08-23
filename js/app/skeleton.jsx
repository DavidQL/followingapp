var React = require('./../../bower_components/react/react-with-addons');
var $ = require('./../../bower_components/jquery/dist/jquery');
var streamParser = require('./stream_parser');
var RoundCounter = require('./round_counter.jsx');
var Question = require('./question/index.jsx');
var Alert = require('./question/components/alert.jsx');

module.exports = React.createClass({
    componentDidMount: function() {
      $.get('/tweets')
        .done(function(tweets) {
          this.tweets = tweets;
          this.setState({
            game_data: streamParser(tweets),
            round: this.state.round,
            loading: null
          });
        }.bind(this))
        .fail(function(error) {
          console.err('Error fetching tweets');
        });

      this.timerInterval = setInterval(function() {
        this.setState({
          secondsLeft: this.state.secondsLeft <= 0 ? 0 : this.state.secondsLeft - 1
        });
      }.bind(this), 1000);
    },

    getInitialState: function() {
      return {
        loading: {
          text: "Fetching tweets...",
          type: "Error"
        },
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
        round: 1,
        gameOver: false,
        score: 0,
        secondsLeft: 60
      };
    },

    advanceRound: function() {
      this.setState({
        game_data: this.state.game_data,
        round: this.state.round + 1,
        score: this.state.score + (this.state.round * this.state.round * 100)
      });
      ga('send', 'event', 'userEvent', 'advanceRound', 'advancingToRound', this.state.round + 1);
    },

    reportGameOver: function(opts) {
      clearInterval(this.timerInterval);
      this.setState({
        gameOver: true,
        won: opts.won,
        alertType: opts.won ? "Success" : "Error"
      });
    },

    resetGame: function() {
      this.setState({
        round: 1,
        gameOver: false,
        won: false,
        score: 0,
        secondsLeft: 60,
        game_data: streamParser(this.tweets),
      });

      this.timerInterval = setInterval(function() {
        this.setState({
          secondsLeft: this.state.secondsLeft <= 0 ? 0 : this.state.secondsLeft - 1
        });
      }.bind(this), 1000);
    },

    reportSecondsLeft: function(seconds) {
      this.setState({
        secondsLeft: seconds
      });
    },

    receiveScore: function(score) {
      this.setState({
        score: score
      });
    },

    render: function() {

      return (
        <div>
          <RoundCounter round={this.state.round}/>
          {
            (function() {
              if (this.state.loading) {
                return <Alert data={this.state.loading} className="col-md-6"/>
              } else if (this.state.gameOver) {
                return <Alert type={this.state.alertType} gameOver={this.state.gameOver} timeBonus={this.state.secondsLeft * 10} score={this.state.score} round={this.state.round} resetGame={this.resetGame} className="col-md-6"/>
              } else {
                return (
                  <div>
                    <span className="score">Score: {this.state.score}</span>
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
