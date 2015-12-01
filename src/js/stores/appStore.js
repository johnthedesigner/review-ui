var AppDispatcher = require('../dispatchers/appDispatcher');
var AppConstants = require('../constants/appConstants');
var EventEmitter = require('events').EventEmitter;
//var React = require('react/addons');
var Update = require('react-addons-update');

var CHANGE_EVENT = "change";


var _cartItems = [];

function _addItem(item){
  console.log("ADD ITEM done - just an example");
  alert("ADD ITEM done - just an example - check the console log for an output");
  _cartItems.push(Math.random());
}




var AppStore = Update(EventEmitter.prototype, { $merge: {
  emitChange:function(){
    this.emit(CHANGE_EVENT);
  },

  addChangeListener:function(callback){
    this.on(CHANGE_EVENT, callback)
  },

  removeChangeListener:function(callback){
    this.removeListener(CHANGE_EVENT, callback)
  },
  getCart:function(){
    return _cartItems
  },

  dispatcherIndex:AppDispatcher.register(function(payload){
    var action = payload.action; // this is our action from handleViewAction
    switch(action.actionType){
      case AppConstants.ADD_ITEM:
        _addItem(payload.action.item);
        break;
    }
    AppStore.emitChange();

    return true;
  })
}});

module.exports = AppStore;