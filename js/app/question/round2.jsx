var React = require('./../../../bower_components/react/react-with-addons');
var _ = require('underscore');
var AvatarGallery = require('./components/avatar_gallery.jsx');
var Tweet = require('./components/tweet.jsx');
var Alert = require('./components/alert.jsx');
var QuestionBase = require('./mixins/question_base.jsx');

module.exports = React.createClass({
    mixins: [QuestionBase],

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
            <AvatarGallery game_data={this.props.game_data} attempt={this.state.attempt} onChoose={this.checkAnswer} showHandles={false}/>
          </div>
        );
      }
      return (
        Component
      );
    }
});
