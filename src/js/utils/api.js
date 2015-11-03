var AppConstants = require('../constants/app-constants');
var AppDispatcher = require('../dispatchers/app-dispatcher');
var request = require('superagent');
var AuthStore = require('../stores/AuthStore');

// 
// TODO - structure AppConstants for API as for example: http://www.code-experience.com/async-requests-with-react-js-and-flux-revisited/
// 
// console.log("********** utils/api.js init");

// TODO - remove fake API info
//var API_URL = '/assets/api.json';
var API_URL = 'http://localhost:3000/api';
var TIMEOUT = 1000;

var _pendingRequests = {};


function abortPendingRequests(key) {
    if (_pendingRequests[key]) {
        _pendingRequests[key]._callback = function(){};
        _pendingRequests[key].abort();
        _pendingRequests[key] = null;
    }
}

function token() {
    //return "test"; // TODO authentication with using AuthStore.getState().token;
    return AuthStore.authGetToken();
}

function makeUrl(part) {
    return API_URL + part;
}

function dispatch(key, response, params) {
    var payload = {actionType: key, response: response};
    if (params) {
        payload.queryParams = params;
    }
    AppDispatcher.handleRequestAction(payload);
}

// return successful response, else return request Constants
function makeDigestFun(key, params) {
    return function (err, res) {
        if (err && err.timeout === TIMEOUT) {
            dispatch(key, AppConstants.TIMEOUT, params);
        } else if (res.status === 400) {
            UserActions.logout();
        } else if (!res.ok) {
            dispatch(key, AppConstants.ERROR, params);
        } else {
            dispatch(key, res, params);
        }
    };
}

// a get request with an authtoken param
function get(url) {
    return request
        .get(url)
        .timeout(TIMEOUT)
        .query({authtoken: token()});
}

// TODO - Record base API and endpoints in ApiConstants and reference here or in separate API Utils by object
var Api = {
  getEntityData: function(entityId) { // TODO - Remove this sample API stuff
    var url = makeUrl("?test="+entityId);
    var key = AppConstants.GET_ENTITY_DATA;
    var params = {entityId: entityId};
    abortPendingRequests(key);
    dispatch(key, AppConstants.PENDING, params);
    _pendingRequests[key] = get(url).end(
        makeDigestFun(key, params)
    );
  },
  reviews: { // All Reivews-related endpoints
    
    get: function() { // Get a list of reviews
      console.log('API.reviews.get();');
      var url = makeUrl('/reviews');
      var key = AppConstants.GET_REVIEWS;
      var params = {};
      abortPendingRequests(key);
      dispatch(key, AppConstants.PENDING, params);
      _pendingRequests[key] = get(url).end(
          makeDigestFun(key, params)
      );
    }
    
  }
};

module.exports = Api;


