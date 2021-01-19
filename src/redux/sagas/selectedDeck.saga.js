import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CARD" actions
function* selectDeck(action) {
  console.log('**********in selectDeckSaga with:', action);
  let id = action.payload
  let response = yield axios({
      method: 'GET',
      url: `/api/selected/${id}`,
      // payload: {action}
  })
  console.log('back from SELECT GET with:', response.data[0]);
  yield put({
      type: 'SET_SELECTED_DECK',
      payload: response.data[0]
  })
}

function* selectedDeckSaga() {
  yield takeLatest('GET_SELECTED_DECK', selectDeck);
}

export default selectedDeckSaga;
