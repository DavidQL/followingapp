(function() {
  var _ = require('underscore');
  var $ = require('./../bower_components/jquery/dist/jquery');
  var React = window.React = require('./../bower_components/react/react-with-addons');
  var Skeleton = require('./app/skeleton.jsx');

  $(document).ready(function() {
    React.renderComponent(
      <Skeleton />,
      $('#main').get(0)
    );
  });
})();