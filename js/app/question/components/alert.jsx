var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      var className = "alert " + (this.props.type || this.props.data.type) + ' ' + this.props.className;
      if (this.props.gameOver && this.props.type === "Success") {
        return (
          <div className={className}>
            You won!
            Time bonus: {this.props.timeBonus}
            Final score: {this.props.score + this.props.timeBonus}

            <a href="#" onClick={this.tweetMessage}>Tell your friends!</a>
          </div>
        );
      }
      if (this.props.gameOver && this.props.type === "Error") {
        return (
          <div className={className}>
            Game over!
            Time bonus: 0
            Final score: {this.props.score}

            You got to round {this.props.round}, <a href="#" onClick={this.tweetMessage}>tell your friends!</a>!
            <button onClick={this.playAgain}>Play again!</button>
          </div>
        );
      }
      return (
        <div className={className}>
          {this.props.text || this.props.data.text}
        </div>
      );
    }
});
