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
// yield put ({
//     type: 'SET_SELECTEDDECK'
// })
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

function* deleteDeck(action) {
    console.log('in delete deck saga with:', action);
    yield axios ({
        method: 'DELETE',
        url: `/api/DECK/${action.payload}`,
        data: action.payload
    })
    yield put({
    type: 'GET_DECK'
    })
}


function* deckSaga() {
  yield takeLatest('CREATE_DECK', createDeck);
  yield takeLatest('GET_DECK', getDeck);
  yield takeLatest('DELETE_DECK', deleteDeck);

}

export default deckSaga;
