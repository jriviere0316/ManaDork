import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';




function* createListItem(action){
console.log('creating list item with:', action);
yield axios({
    method: 'POST',
    url: '/api/list',
    data: action.payload
});
// console.log('back from CREATE_ITEM with:', response.data);
yield put ({
    type: 'GET_LIST'
})
// yield put ({
//     type: 'SET_SELECTEDDECK'
// })
}



function* getList(){
    // console.log('in get decks with:', );
    try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        };
        console.log('config is:', config);
        const response = yield axios.get('api/list', config);
        
        console.log('back from list GET with:', response.data);
        yield put({ type: 'SET_LIST', payload: response.data});
    }catch (error){
        console.log('GET deck request failed,', error);
    }
}

// function* deleteDeck(action) {
//     console.log('in delete deck saga with:', action);
//     yield axios ({
//         method: 'DELETE',
//         url: `/api/DECK/${action.payload}`,
//         data: action.payload
//     })
//     yield put({
//     type: 'GET_DECK'
//     })
// }
 

function* listSaga() {
  yield takeLatest('ADD_LISTITEM', createListItem);
  yield takeLatest('GET_LIST', getList);

}

export default listSaga;
