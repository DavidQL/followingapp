var React = require('./../../bower_components/react/react-with-addons');

module.exports = React.createClass({
    render: function() {
      return (
        <div>
          Round counter says: round {this.props.round}
        </div>
      );
    }
});