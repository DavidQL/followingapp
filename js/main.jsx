(function() {
  var _ = require('underscore');
  var $ = require('./../bower_components/jquery/dist/jquery');
  var React = require('./../bower_components/react/react-with-addons');

  $(document).ready(function() {
    var Skeleton = React.createClass({
      render: function() {
        return (
          <h3> Whose Tweet Is It Anyway? </h3>
        );
      }
    });

    React.renderComponent(
      <Skeleton />,
      $('#main').get(0)
    );
  });
})();