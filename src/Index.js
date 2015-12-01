import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import PoweredBy from './components/Powered-by';
import About from './components/About';
import Reviews from './components/reviews/Reviews';

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/reviews" component={Reviews}/>
      <Route path="/about" component={About}/>
      <Route path="/poweredby" component={PoweredBy}/>
    </Route>
  </Router>
  , document.getElementById('content')
);
