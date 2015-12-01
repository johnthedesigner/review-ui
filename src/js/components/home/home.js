/** @jsx React.DOM */
var React = require('react');
var Login = require('../auth/login');
var AuthStore = require('../../stores/AuthStore.js');
var AuthenticationMixin = require('../../mixins/AuthenticationMixin.js');


var Home = React.createClass({
  mixins: [ AuthenticationMixin ],
  render: function () {
    var token = AuthStore.authGetToken();
    return (
      <div>
        <h1>Home</h1>
      </div>
    );
  }
});

module.exports = Home;
