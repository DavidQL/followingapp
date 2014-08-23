var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      var className = "alert " + (this.props.type || this.props.data.type) + ' ' + this.props.className;
      if (this.props.gameOver && this.props.type === "Success") {
        var tweet_url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent("I just won #Following! How well do you know your timeline? Find out: http://followingapp.herokuapp.com"); 
        return (
          <div className={className}>
            <h2>You won!</h2>
            <span>Time bonus: {this.props.timeBonus}</span>
            <h3>Final score: {this.props.score + this.props.timeBonus}</h3>

            <a href={tweet_url}>Brag about it!</a>

            <button className="btn-lg" onClick={this.props.resetGame}>Play again!</button>
          </div>
        );
      }
      if (this.props.gameOver && this.props.type === "Error") {
        var tweet_text = "I got to round " + this.props.round + " on #Following. How well do you know your timeline? Find out: http://followingapp.herokuapp.com";
        var tweet_url = "https://twitter.com/intent/tweet?text=" + encodeURIComponent(tweet_text); 
        return (
          <div className={className}>
            <h2>Game over!</h2>
            <span>Time bonus: 0</span>
            <h3>Final score: {this.props.score}</h3>

            <span>
              You got to round {this.props.round}, &nbsp;
              <a href={tweet_url}>brag about it!</a>
            </span>

            <button className="btn-lg" onClick={this.props.resetGame}>Play again!</button>
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
