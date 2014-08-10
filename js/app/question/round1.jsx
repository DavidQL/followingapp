var React = require('./../../../bower_components/react/react-with-addons');
var _ = require('underscore');
var AvatarGallery = require('./components/avatar_gallery.jsx');

module.exports = React.createClass({
    getInitialState: function() {
      return {
        attempt: 1
      };
    },

    render: function() {
      return (
        <div className="col-md-9">
          <div className="col-md-5 tweet">
            {this.props.game_data[0].tweet.body}
          </div>
          
          <AvatarGallery game_data={this.props.game_data} attempt={this.state.attempt} />
        </div>
      );
    }
});
