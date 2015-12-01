import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import PoweredBy from './components/Powered-by';
import About from './components/About';
import Reviews from './components/reviews/Reviews';

// Reactor Experimentation
import ReactorTest from './components/reactor/ReactorTest';
import reactor from './reactor'
import actions from './actions/testActions'
import ProductStore from './stores/ProductStore'
import CartStore from './stores/CartStore'

reactor.registerStores({
  'products': ProductStore,
  'cart': CartStore,
})

window.React = React;

actions.fetchProducts();

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="/reviews" component={Reviews}/>
      <Route path="/about" component={About}/>
      <Route path="/poweredby" component={PoweredBy}/>
      <Route path="/reactor" component={ReactorTest}/>
    </Route>
  </Router>
  , document.getElementById('content')
);
