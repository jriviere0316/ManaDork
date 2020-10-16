import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';





function* createDeck(action) {
console.log('creating deck with:', action);
yield axios({
    method: 'POST',
    url: '/api/deck',
    data: action.payload
});
// console.log('back from CREATE_ITEM with:', response.data);
yield put ({
    type: 'GET_DECK'
})
}

function* getDeck(action){
    console.log('in get items with:', action);
    let response = yield axios ({
        method: 'GET',
        url: `/api/deck`
    })
    console.log('back from GET with:', response.data);
    yield put({
        type: 'SET_DECK',
        payload: response.data
    })
}


function* deckSaga() {
  yield takeLatest('CREATE_DECK', createDeck);
  yield takeLatest('GET_DECK', getDeck);

}

export default deckSaga;
