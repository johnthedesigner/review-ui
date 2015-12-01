/** @jsx React.DOM */
var Login = require('../components/auth/login');
var AuthStore = require('../stores/AuthStore.js');

var AuthenticationMixin = {
	  statics: {
	    willTransitionTo: function (transition) {
	      if (!AuthStore.getState().loggedIn) {
	        Login.attemptedTransition = transition;
	        transition.redirect('/login');
	        alert('Please login first.');
	      }
	    }
	  }
	}


module.exports = AuthenticationMixin;