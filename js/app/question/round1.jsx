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
        <div className="col-md-6">
          <div className="row">
            <div className="col-md-9 tweet center-block">
              {this.props.game_data[0].tweet.body}
            </div>
          </div>

          
          <AvatarGallery game_data={this.props.game_data} attempt={this.state.attempt} />
        </div>
      );
    }
});
