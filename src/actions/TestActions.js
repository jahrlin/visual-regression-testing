import http from 'superagent';
import Dispatcher from '../core/Dispatcher';
import ActionTypes from '../constants/ActionTypes';

export default {

  testsUpdated() {
    http.get('/api/tests/list')
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        console.log('dispatching TESTS_UPDATED', res.body);
        Dispatcher.dispatch({
          type: ActionTypes.TESTS_UPDATED,
          tests: res.body
        });
      });
  },

  listAllTests() {
    Dispatcher.dispatch({
      type: ActionTypes.LIST_ALL_TESTS
    });

    http.get('/api/tests/list')
      .accept('application/json')
      .end((err, res) => {
        if (err) {
          console.error(err);
        }
        console.log('dispatching RECEIVE_ALL_TESTS', res.body);
        Dispatcher.dispatch({
          type: ActionTypes.RECEIVE_ALL_TESTS,
          tests: res.body
        });
      });
  },

  create(test) {
    http.post('/api/tests/create')
      .accept('application/json')
      .send(test)
      .end((err, res) => {
        if (err) {
          console.error(err);
        }

        this.testsUpdated();
      });
  }
};
