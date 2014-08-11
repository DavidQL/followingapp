var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      return (
        <div>
          {this.props.data.text}
        </div>
      );
    }
});
