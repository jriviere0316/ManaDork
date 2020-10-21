import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';

// worker Saga: will be fired on "FETCH_CARD" actions
function* getFriends(action) {
    console.log('**********in getFriends Saga with:', action.payload);
    let response = yield axios({
        method: 'GET',
        url: `/api/friends`,
        data: action.payload
})
    console.log('back from GET with:', response.data);
    yield put({
        type: 'SET_FRIENDS',
        payload: response.data
    })
}

function* friendsSaga() {
  yield takeLatest('GET_FRIENDS', getFriends);
}

export default friendsSaga;
