/**
 * Mocking client-server processing
 */
'use strict';

import _ from 'lodash'

var API = exports;

var _fixtures = require('./fixtures.json');

var TIMEOUT = 100;

// Just get all reviews from fixtures
API.getReviews = function (cb, timeout) {
    timeout = timeout || TIMEOUT;
    setTimeout(function () {
        cb(_fixtures[0].reviews);
    }, timeout);
};

// Get a specific review by ID from fixtures
API.getReview = function (id, cb, timeout) {
    timeout = timeout || TIMEOUT;
    id = id - 0 // TODO this will no longer be necessary if IDs are strings
    var review = _.filter(_fixtures[0].reviews, {_id: id})
    setTimeout(function () {
        cb(review)
    }, timeout);
};
