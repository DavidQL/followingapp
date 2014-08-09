var React = require('./../../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      var Avatars = _.map(this.props.game_data[0].people, function(person) {
        return <img src={person.profile_image_url && person.profile_image_url.replace(/_normal/, "_bigger")} />;
      });
      return (
        <div>
          <h4>Round 1</h4>
          Tweet: {this.props.game_data[0].tweet.body}
          people: 

          { Avatars }
        </div>
      );
    }
});
