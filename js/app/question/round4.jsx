var React = require('./../../../bower_components/react/react-with-addons');
var $ = require('./../../../bower_components/jquery/dist/jquery');
var _ = require('underscore');
var AvatarGallery = require('./components/avatar_gallery.jsx');
var TweetSourceGallery = require('./components/tweet_source_gallery.jsx');
var Tweet = require('./components/tweet.jsx');
var Alert = require('./components/alert.jsx');
var QuestionBase = require('./mixins/question_base.jsx');

module.exports = React.createClass({
    mixins: [QuestionBase],

    onChooseAvatar: function(user) {
      var avatar_correct = this.props.game_data[this.state.attempt - 1].tweet.author_id === user.id;
      this.setState({
        avatar_correct: avatar_correct,
        selectedUserId: user.id
      });
      $('body').animate({
        scrollTop: $(this.refs.secondary_callout.getDOMNode()).position().top
      });
    },

    onChooseTweetSource: function(source) {
      var tweet_source_correct = this.props.game_data[this.state.attempt - 1].tweet.readable_source === source;

      if (tweet_source_correct && this.state.avatar_correct) {
        this.props.advanceRound();
        this.props.reportGameOver({won: true});
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
            <AvatarGallery game_data={this.props.game_data} attempt={this.state.attempt} onChoose={this.onChooseAvatar} showHandles={false} selectedUserId={this.state.selectedUserId}/>
            <span ref="secondary_callout" className="callout col-md-9 center-block text-center">
              <strong>And</strong> how did they send that tweet?
            </span>
            <TweetSourceGallery game_data={this.props.game_data} attempt={this.state.attempt} onChoose={this.onChooseTweetSource} />
          </div>
        );
      }
      return (
        Component
      );
    }
});
