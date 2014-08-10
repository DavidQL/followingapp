var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      var Avatars = _.map(this.props.game_data[this.props.attempt - 1].people, function(person) {
        return <img src={person.profile_image_url && person.profile_image_url.replace(/_normal/, "_bigger")} />;
      });
      return (
        <div className="row">
          <div className="text-center avatar-gallery center-block">
            {Avatars}
          </div>
        </div>

      );
    }
});
