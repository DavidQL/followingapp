var React = require('./../../bower_components/react/react-with-addons');
var $ = require('./../../bower_components/jquery/dist/jquery');
var streamParser = require('./stream_parser');
var Thermometer = require('./thermometer.jsx');
var Question = require('./question.jsx');

module.exports = React.createClass({
    componentDidMount: function() {
      $.get('/tweets')
        .done(function(tweets) {
          this.setState({
            tweets: tweets,
            round: this.state.round
          });
        }.bind(this))
        .fail(function(error) {
          console.err('Error fetching tweets');
        });
    },

    getInitialState: function() {
      return {
        tweets: [],
        round: 1
      };
    },

    render: function() {
      return (
        <div>
          <Thermometer />
          <Question />
        </div>
      );
    }
});
