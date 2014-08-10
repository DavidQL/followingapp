var React = require('./../../bower_components/react/react-with-addons');

module.exports = React.createClass({
    render: function() {
      return (
        <div className="col-md-3">
          Round counter says: round {this.props.round}
        </div>
      );
    }
});