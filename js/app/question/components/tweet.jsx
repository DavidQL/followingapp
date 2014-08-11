var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');
var moment = require('moment');

module.exports = React.createClass({
    render: function() {
      var game_data_index = this.props.attempt - 1;
      var formattedDate = moment(this.props.game_data[game_data_index].tweet.date).format('h:mm a - D MMM YYYY');
      return (
          <div className="row">
            <div className="col-md-9 tweet center-block">
              {this.props.game_data[game_data_index].tweet.body}
              <div className="date">
                {formattedDate}
              </div>
            </div>

            <div className="callout col-md-9 center-block text-center">
              Who tweeted that?
            </div>
          </div>
      );
    }
});
