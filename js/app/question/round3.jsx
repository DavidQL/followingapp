var React = require('./../../../bower_components/react/react-with-addons');
var _ = require('underscore');
var AvatarGallery = require('./components/avatar_gallery.jsx');
var ProfileBackgroundGallery = require('./components/profile_background_gallery.jsx');
var Tweet = require('./components/tweet.jsx');
var Alert = require('./components/alert.jsx');
var QuestionBase = require('./mixins/question_base.jsx');

module.exports = React.createClass({
    mixins: [QuestionBase],

    onChooseAvatar: function(user) {
      var avatar_correct = this.props.game_data[this.state.attempt - 1].tweet.author_id === user.id;
      this.setState({
        avatar_correct: avatar_correct
      });
    },

    onChooseProfileBackground: function(user) {
      var profile_background_correct = this.props.game_data[this.state.attempt - 1].tweet.author_id === user.id;

      if (profile_background_correct && this.state.avatar_correct) {
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
    },

    render: function() {
      var Component;
      if (this.state.alert) {
        Component = (
          <div className="col-md-6 question">
            <Alert data={this.state.alert} />
          </div>
        )
      } else {
        Component = (
          <div className="col-md-6 question">
            <Tweet game_data={this.props.game_data} attempt={this.state.attempt}/>
            <AvatarGallery game_data={this.props.game_data} attempt={this.state.attempt} onChoose={this.onChooseAvatar} showHandles={false}/>
            <span className="callout col-md-9 center-block text-center">
              <strong>And</strong> what's their profile banner?
            </span>
            <ProfileBackgroundGallery game_data={this.props.game_data} attempt={this.state.attempt} onChoose={this.onChooseProfileBackground} showHandles={false} />
          </div>
        );
      }
      return (
        Component
      );
    }
});
