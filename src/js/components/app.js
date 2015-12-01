/** @jsx React.DOM */
var React = require('react');
var RouteHandler = require('react-router').RouteHandler;
var Template = require('./appTemplate');

var APP = React.createClass({
  render: function () {
    return (
      <Template>
        <RouteHandler/>
      </Template>
    );
  }
});




exports.APP = APP;



