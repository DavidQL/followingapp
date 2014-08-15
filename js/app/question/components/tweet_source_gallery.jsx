var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');
var $ = require('./../../../../bower_components/jquery/dist/jquery');

module.exports = React.createClass({
    render: function() {
      var Sources = _.map(this.props.game_data[this.props.attempt - 1].uniqueTweetSources, function(source) {
        var isCorrect = this.props.game_data[this.props.attempt - 1].tweet.readable_source === source ? "correct" : "";
        return <span onClick={this.props.onChoose.bind(null, source)} className={isCorrect}>{source}</span>
      }, this);
      return (
        <div className="row">
          <div className="text-center tweet-sources-gallery center-block">
            {Sources}
          </div>
        </div>
      );
    }
});
