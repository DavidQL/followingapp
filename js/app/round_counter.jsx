var React = require('./../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    render: function() {
      return (
        <div className="col-md-3 round-counter">
          {
            _.times(4, function(i) {
              var className = (this.props.round === i + 1 ? 'active round col-md-10' : 'round col-md-10 hidden-sm hidden-xs');
              return (
                <div className={className}>
                  <span>{"Round " + (i + 1)}</span>
                  {
                    _.times(i+1, function() {
                      return <div className="glyphicon glyphicon-fire"></div>
                    })
                  }
                </div>
              );
            }, this)
          }
        </div>
      );
    }
});