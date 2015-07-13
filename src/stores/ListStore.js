/*! React Starter Kit | MIT License | http://www.reactstarterkit.com/ */

import EventEmitter from 'eventemitter3';
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

const CHANGE_EVENT = 'change';

var loading = false;
var tests = [];

var ListStore = Object.assign({}, EventEmitter.prototype, {

  isLoading() {
    return loading;
  },

  /**
   * Emits change event to all registered event listeners.
   *
   * @returns {Boolean} Indication if we've emitted an event.
   */
  emitChange() {
    return this.emit(CHANGE_EVENT);
  },

  /**
   * Register a new change event listener.
   *
   * @param {function} callback Callback function.
   */
  onChange(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * Remove change event listener.
   *
   * @param {function} callback Callback function.
   */
  off(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getAll() {
    return tests;
  }

});

ListStore.dispatchToken = Dispatcher.register((action) => {
  switch (action.type) {
    case ActionTypes.TESTS_UPDATED:
      tests = action.tests;
      console.log('liststore TESTS_UPDATED', tests);
      ListStore.emitChange();
    break;
    case ActionTypes.RECEIVE_ALL_TESTS:
      tests = action.tests;
      console.log('liststore RECEIVE_ALL_TESTS', tests);
      ListStore.emitChange();
    break;
    case ActionTypes.CREATED_TEST:
      console.log('liststore CREATED_TEST');
      ListStore.emitChange();
    break;
    default:
      // Do nothing
  }

});

export default ListStore;
