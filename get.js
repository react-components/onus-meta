/**
 * Module dependencies
 */

var React = require('react');
var watch = require('onus-content').registry.watch;

var Get = React.createClass({
  componentDidMount: function() {
    this.subscription = watch(this.onChange);
  },
  onChange: function(name, value) {
    if (name.indexOf('meta::') !== 0) return;
    name = name.replace('meta::', '');
    value = value.join('');
    if (name === 'title') return document.title = value;
    if (name === 'favicon') return this.getFavicon().href = value;
    if (process.env.NODE_ENV === 'development') console.warn('Unhandled meta tag', JSON.stringify(name));
  },
  getFavicon: function() {
    if (this.favicon) return this.favicon;
    var link = this.favicon = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    document.getElementsByTagName('head')[0].appendChild(link);
    return link;
  },
  componentWillUnmount: function() {
    this.subscription();
    this.favicon && this.favicon.remove();
  },
  render: function() {
    return false;
  }
});

exports = module.exports = Get;
exports['default'] = Get;