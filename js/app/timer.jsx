var React = require('./../../bower_components/react/react-with-addons');
var _ = require('underscore');

module.exports = React.createClass({
    getInitialState: function() {
      return {
        is_mounted: false,
        secondsLeft: 60
      };
    },

    componentWillUnmount: function() {
      clearInterval(this.timeInterval);
    },

    componentDidMount: function() {
      setTimeout(function() {
        this.setState({
          is_mounted: true
        });
      }.bind(this), 0);

      this.timeInterval = setInterval(function() {
        this.setState({
          secondsLeft: this.state.secondsLeft - 1 <= 0 ? 0 : this.state.secondsLeft - 1
        });
        // TODO: I want to report this just once inside componentWillUnmount(), but this code errors when run inside that function
        this.props.reportSecondsLeft(this.state.secondsLeft);
      }.bind(this), 1000);
    },

    render: function() {
      var mounted_classname = this.state.is_mounted ? 'mounted' : '';
      return (
        <div className="timer">  
          <div className={mounted_classname}>
            <span>
              {"Bonus points: " + this.state.secondsLeft * 10}
            </span>
          </div>
        </div>
      );
    }
});
