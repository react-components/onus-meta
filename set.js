/**
 * Module dependencies
 */

var React = require('react');
var register = require('onus-content').registry.register;

var Set = React.createClass({
  componentWillUnmount: function() {
    register(this.props.name, null, this.props.depth);
  },
  render: function() {
    var props = this.props;

    var location = props.prepend ?
      1 :
      props.append ?
        2 :
        0;

    register('meta::' + props.name, props.content, props.depth, location);
    return false;
  }
});

exports = module.exports = Set;
exports['default'] = Set;