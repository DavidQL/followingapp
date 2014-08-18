var React = require('./../../../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      var className = "alert " + (this.props.type || this.props.data.type) + ' ' + this.props.className;
      return (
        <div className={className}>
          {this.props.text || this.props.data.text}
        </div>
      );
    }
});
