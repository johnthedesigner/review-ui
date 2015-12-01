/** @jsx React.DOM */
var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var auth = require('../../stores/AuthStore'); // TODO / USE DISPATCHER & ACTIONS
var Login = require('../auth/login');
var AppActions = require('../../actions/appActions.js');
var AuthStore = require('../../stores/AuthStore.js');
var Link = Router.Link;


var Header = React.createClass({
  getInitialState: function () {
    return AuthStore.getState();
  },
  setStateOnAuth: function (loggedIn) {
    this.setState(AuthStore.getState());
  },
  componentWillMount: function () {
    AuthStore.authOnChangeHeader(this.setStateOnAuth);
  },
  render: function () {
    var loginOrOut = this.state.loggedIn ?
      <Link to="logout">Log out</Link> :
      <Link to="login">Sign in</Link>;
    return (
      <div>
        <h1 className="breadcrumbs">Review&amp;Me</h1>
        <ul className="nav nav-tabs">
          <li>{loginOrOut}</li>
          <li><Link to="reviews">Reviews</Link></li>
        </ul>
        <br/>
      </div>
    );
  }
});




module.exports = Header;



