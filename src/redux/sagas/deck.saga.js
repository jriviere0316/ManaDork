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

function* getDeck(){
    // console.log('in get decks with:', );
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        console.log('config is:', config);
        const response = yield axios.get('api/deck', config);

        console.log('back from GET with:', response.data);
        yield put({ type: 'SET_DECK', payload: response.data});
    }catch (error){
        console.log('GET deck request failed,', error);
    }
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
function* updateDeck(action) {
    console.log('in update deck saga with:', action.payload);
    yield axios ({
        method: 'PUT',
        url: `/api/DECK/${action.payload.id}`,
        data: action.payload
    })
    yield put({
        type: 'GET_DECK'
    })
}

function* deckSaga() {
  yield takeLatest('CREATE_DECK', createDeck);
  yield takeLatest('GET_DECK', getDeck);
  yield takeLatest('UPDATE_DECK', updateDeck);
  yield takeLatest('DELETE_DECK', deleteDeck);

}

export default deckSaga;
