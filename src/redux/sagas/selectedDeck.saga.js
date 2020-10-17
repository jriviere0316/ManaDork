import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CARD" actions
function* selectDeck(action) {
  console.log('**********in selectDeckSaga with:', action);
  let response = yield axios({
      method: 'GET',
      url: `/api/deck/${action.payload}`,
      // payload: {action}
  })
  console.log('back from GET with:', response.data);
  yield put({
      type: 'SET_RECENT_DECK',
      payload: response.data.data
  })
}

function* selectedDeckSaga() {
  yield takeLatest('SET_SELECTED_DECK', selectDeck);
}

export default selectedDeckSaga;
