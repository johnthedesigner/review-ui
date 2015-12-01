/** @jsx React.DOM */
var AppConstants = require('../constants/appConstants.js');
var AppDispatcher = require('../dispatchers/appDispatcher.js');

var AppActions = {
  addItem:function(){
    AppDispatcher.handleViewAction({
      actionType: AppConstants.ADD_ITEM
    })
  }
}

module.exports = AppActions;