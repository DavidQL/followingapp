var React = require('./../../../bower_components/react/react-with-addons');
var Round1 = require('./round1.jsx');
var Round2 = require('./round2.jsx');
var Round3 = require('./round3.jsx');
var Round4 = require('./round4.jsx');

module.exports = React.createClass({
    render: function() {
      var Question = (function() {
        switch(this.props.round) {
        case 1: 
          return <Round1 game_data={this.props.game_data.round1} advanceRound={this.props.advanceRound}/>
          break;
        case 2:
          return <Round2 game_data={this.props.game_data.round2} advanceRound={this.props.advanceRound}/>
          break;
        case 3:
          return <Round3 game_data={this.props.game_data.round3} advanceRound={this.props.advanceRound}/>
          break;
        case 4:
          return <Round4 />
          break;
        }
      }.bind(this))();

      return (
        Question
      );
    }
});
