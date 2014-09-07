var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      var Avatars = _.map(this.props.game_data[this.props.attempt - 1].people, function(person) {
        var img_url = person.profile_image_url && person.profile_image_url.replace(/_normal/, '_bigger');
        var selected = this.props.selectedUserId === person.id ? 'selected' : '';
        var correctAnswerClass = this.props.game_data[this.props.attempt - 1].tweet.author_id === person.id ? 'correct': '';
        if (this.props.showHandles) {
           return (
            <div className="wrapped-image">
              <img src={img_url} onClick={this.props.onChoose.bind(null, person)} className={selected + ' ' + correctAnswerClass}/>
              <span className="handle">@{person.screen_name}</span>
            </div>
          );         
        }
        return <img src={img_url} onClick={this.props.onChoose.bind(null, person)} className={selected + ' ' + correctAnswerClass}/>;
      }, this);
      return (
        <div className="row">
          <div className="text-center avatar-gallery center-block">
            {Avatars}
          </div>
        </div>
      );
    }
});
