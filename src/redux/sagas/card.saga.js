import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CARD" actions
function* fetchCard() {
  
}

function* querySaga() {
  yield takeLatest('FETCH_CARD', fetchCard);
}

export default querySaga;
