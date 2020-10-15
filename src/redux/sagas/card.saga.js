import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CARD" actions
function* fetchCard(action) {
  console.log('**********in fetchGifSaga with:', action);
  let response = yield axios({
      method: 'GET',
      url: `/api/card/${action.payload}`,
      // payload: {action}
  })
  console.log('back from GET with:', response.data);
  yield put({
      type: 'SET_CARD',
      payload: response.data.data
  })
}

function* cardSaga() {
  yield takeLatest('FETCH_CARD', fetchCard);
}

export default cardSaga;
