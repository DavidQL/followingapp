var _ = require('underscore');
var AvatarGallery = require('./../components/avatar_gallery.jsx');
var Tweet = require('./../components/tweet.jsx');
var Alert = require('./../components/alert.jsx');

module.exports = {
    getInitialState: function() {
      return {
        attempt: 1
      };
    },

    handleFail: function() {
      if (this.state.attempt >= 3) {
        this.setState({
          alert: {
            text: "Wrong! Game over",
            type: "Error"
          }
        });
        return;
      }

      this.setState({
        attempt: this.state.attempt + 1,
        alert: {
          text: "Wrong! Now at attempt " + (this.state.attempt + 1),
          type: "Error"
        }
      });

      setTimeout(function() {
        this.setState({
          attempt: this.state.attempt,
          alert: null
        });
      }.bind(this), 1000);
    },

    checkAnswer: function(user) {
      if (this.props.game_data[this.state.attempt - 1].tweet.author_id === user.id) {
        this.setState({
          attempt: this.state.attempt + 1,
          alert: {
            text: "Nice! Onto the next round...",
            type: "Success"
          }
        });
        setTimeout(this.props.advanceRound, 1000);
      } else {
        this.handleFail();
      }
    }
};
