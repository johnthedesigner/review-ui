/**
 * Mocking client-server processing
 */
'use strict'

import _ from 'lodash'

var API = exports

var _fixtures = require('./fixtures.json')

var TIMEOUT = 500;

// Just get all reviews from fixtures
API.getReviews = function (cb, timeout) {
  timeout = timeout || TIMEOUT
  let reviews = _fixtures[0].reviews
  setTimeout(function () {
    cb(reviews)
  }, timeout)
};

// Just get all reviews from fixtures
API.getFeed = function (cb, timeout) {
  timeout = timeout || TIMEOUT
  let reviews = _fixtures[0].reviews
  setTimeout(function () {
    cb(reviews)
  }, timeout)
};

// Get a specific review by ID from fixtures
API.getReview = function (id, cb, timeout) {
  timeout = timeout || TIMEOUT
  id = id - 0 // TODO this will no longer be necessary if IDs are strings
  var review = _.filter(_fixtures[0].reviews, {_id: id})
  setTimeout(function () {
    cb(review)
  }, timeout)
};

// Toggle liked by ID from fixtures
API.likeButton = function (id, cb, timeout) {
  timeout = timeout || TIMEOUT
  id = id - 0 // TODO this will no longer be necessary if IDs are strings
  var review = _.filter(_fixtures[0].reviews, {_id: id})
  if (review[0].like) {
    review[0].like = false
  } else {
    review[0].like = true
  }
  setTimeout(function () {
    cb(review)
  }, timeout)
};
