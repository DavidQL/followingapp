var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      // TODO: on image load fail replace with no-profile-background
      var ProfileImgs = _.map(this.props.game_data[this.props.attempt - 1].people, function(person) {
        var img_url = person.profile_banner_url && person.profile_banner_url + '/300x100';
        var correctAnswerClass = this.props.game_data[this.props.attempt - 1].tweet.author_id === person.id ? 'correct': '';
        if (!img_url) {
          return <div className={"no-profile-background " + correctAnswerClass} onClick={this.props.onChoose.bind(null, person)}><span>@{person.screen_name}</span></div>
        }
        return <img className={correctAnswerClass} src={img_url} onClick={this.props.onChoose.bind(null, person)}/>;
      }, this);
      return (
        <div className="row">
          <div className="text-center profile-background-gallery center-block">
            {ProfileImgs}
          </div>
        </div>
      );
    }
});
