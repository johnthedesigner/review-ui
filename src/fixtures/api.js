/**
 * Mocking client-server processing
 */
'use strict';

var API = exports;

var _fixtures = require('./fixtures.json');

var TIMEOUT = 100;

API.getReviews = function (cb, timeout) {
    timeout = timeout || TIMEOUT;
    setTimeout(function () {
        cb(_fixtures[0].reviews);
    }, timeout);
};
