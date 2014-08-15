var React = require('./../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    getInitialState: function() {
      return {
        is_mounted: false,
        score: 10000
      };
    },

    componentWillUnmount: function() {
      clearInterval(this.scoreInterval);
    },

    componentDidMount: function() {
      setTimeout(function() {
        this.setState({
          is_mounted: true
        });
      }.bind(this), 0);

      this.scoreInterval = setInterval(function() {
        if (this.state.score === 0) {
          this.props.reportGameOver();
        }

        this.setState({
          score: this.state.score - 83 <= 0 ? 0 : this.state.score - 83
        });
        // TODO: I want to report this just once inside componentWillUnmount(), but this code errors when run inside that function
        this.props.reportScore(this.state.score);
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
