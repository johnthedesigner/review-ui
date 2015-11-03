var React = require('react');
var Router = require('react-router');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var Link = Router.Link;


APP = require('./components/app').APP;

// Auth Pages
var Logout = require('./components/auth/logout');
var Login = require('./components/auth/login');
// Closed Access Pages
var Home = require('./components/home/home');
// Open Access Pages
var About = require('./components/about/about');


var routes = (
  <Route handler={APP}>
    <Route name="login" handler={Login}/>
    <Route name="logout" handler={Logout}/>
    <Route name="home" handler={Home}/>
    <Route name="about" handler={About}/>
  </Route>
);

Router.run(routes, function (Handler) {
  React.render(<Handler/>, document.getElementById('example'));
});
