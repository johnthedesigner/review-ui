import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route } from 'react-router'
import ReviewActions from './actions/reviewActions'
// Components
import App from './components/App'
import Login from './components/login/Login'
import About from './components/About'
import Feed from './components/feed/Feed'
import Review from './components/review/Review'
import NewReview from './components/newreview/NewReview'

// Reactor Experimentation
//TODO Remove all testing reactor docs/functions
import ReactorTest from './components/reactor/ReactorTest'
import reactor from './reactor'
import ProductStore from './stores/ProductStore'
import CartStore from './stores/CartStore'
import ReviewStore from './stores/ReviewStore'
import RequestStore from './stores/RequestStore'
import AuthStore from './stores/AuthStore'

reactor.registerStores({
  'products': ProductStore,
  'cart': CartStore,
  'requests': RequestStore,
  'reviews': ReviewStore,
  'auth': AuthStore,
})

window.React = React;

ReactDOM.render(
  <Router>
    <Route path="/" component={App}>
      <Route path="login" component={Login}/>
      <Route path="feed" component={Feed}/>
      <Route path="review/:id" component={Review}/>
      <Route path="new" component={NewReview}/>
      <Route path="about" component={About}/>
      <Route path="reactor" component={ReactorTest}/>
    </Route>
  </Router>
  , document.getElementById('content')
);
