var React = require('./../../../bower_components/react/react-with-addons');
var _ = require('underscore');
var moment = require('moment');
var AvatarGallery = require('./components/avatar_gallery.jsx');

module.exports = React.createClass({
    getInitialState: function() {
      return {
        attempt: 1
      };
    },

    render: function() {
      var formattedDate = moment(this.props.game_data[0].tweet.date).format('h:mm a - D MMM YYYY');
      return (
        <div className="col-md-6 question">
          <div className="row">
            <div className="col-md-9 tweet center-block">
              {this.props.game_data[0].tweet.body}
              <div className="date">
                {formattedDate}
              </div>
            </div>
          </div>

          
          <AvatarGallery game_data={this.props.game_data} attempt={this.state.attempt} />
        </div>
      );
    }
});
