var React = require('./../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    getInitialState: function() {
      return {
        is_mounted: false,
        score: 10000
      };
    },

    componentDidMount: function() {
      setTimeout(function() {
        this.setState({
          is_mounted: true
        });
      }.bind(this), 0);

      setInterval(function() {
        this.setState({
          score: this.state.score - 83 <= 0 ? 0 : this.state.score - 83
        });
      }.bind(this), 500);
    },

    render: function() {
      var mounted_classname = this.state.is_mounted ? 'mounted' : '';
      return (
        <div className="scoring">  
          <span className={"score " + mounted_classname}>{"Score: " + this.state.score}</span>
          <div className={mounted_classname}></div>
        </div>
      );
    }
});
