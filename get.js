/**
 * Module dependencies
 */

var React = require('react');
var watch = require('onus-content').registry.watch;

var Get = React.createClass({
  componentDidMount: function() {
    this.tags = {};
    this.subscription = watch(this.onChange);
  },
  onChange: function(name, value) {
    if (name.indexOf('meta::') !== 0) return;
    name = name.replace('meta::', '');
    value = value.join('');
    if (name === 'favicon') return this.getFavicon().href = value;
    if (name === 'title') document.title = value;
    this.setMeta(name, value);
  },
  getFavicon: function() {
    if (this.favicon) return this.favicon;
    var link = this.favicon = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    this.head().appendChild(link);
    return link;
  },
  setMeta: function(name, value) {
    var el = this.tags[name];
    if (!el) {
      el = this.tags[name] = document.createElement('meta');
      this.head().appendChild(el);
      var attrName = name.indexOf('og:') === 0 ? 'property' : 'name';
      el.setAttribute(attrName, name);
    }
    if (value) {
      el.setAttribute('content', value);
    } else {
      this.head().removeChild(el);
      delete this.tags[name];
    }
  },
  componentWillUnmount: function() {
    this.subscription();
    this.favicon && this.favicon.remove();
    var head = this.head();
    for (var k in this.tags) {
      head.removeChild(this.tags[k]);
    }
  },
  render: function() {
    return false;
  },
  head: function() {
    return document.getElementsByTagName('head')[0];
  }
});

exports = module.exports = Get;
exports['default'] = Get;
