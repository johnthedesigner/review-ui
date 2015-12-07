import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route } from 'react-router';
import App from './components/App';
import About from './components/About';
import Feed from './components/reviews/Feed';
import Review from './components/reviews/Review';

// Reactor Experimentation
//TODO Remove all testing reactor docs/functions
import ReactorTest from './components/reactor/ReactorTest';
import reactor from './reactor'
import ProductStore from './stores/ProductStore'
import CartStore from './stores/CartStore'
import FeedStore from './stores/FeedStore'
import ReviewStore from './stores/ReviewStore'
import RequestStore from './stores/RequestStore'

reactor.registerStores({
  'products': ProductStore,
  'cart': CartStore,
  'feed': FeedStore,
  'review': ReviewStore,
  'requests': RequestStore,
})

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="feed" component={Feed}/>
      <Route path="review/:id" component={Review}/>
      <Route path="about" component={About}/>
      <Route path="reactor" component={ReactorTest}/>
    </Route>
  </Router>
  , document.getElementById('content')
);
