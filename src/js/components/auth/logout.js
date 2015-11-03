/** @jsx React.DOM */
var React = require('react');
var AuthStore = require('../../stores/AuthStore.js');


var Logout = React.createClass({
  componentDidMount: function () {
    AuthStore.authLogout();
  },

  render: function () {
    return <p>You are now logged out.</p>;
  }
});


module.exports = Logout;