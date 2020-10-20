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



function* getList(action) {
    console.log('**********in fetchList Saga with:', action.payload);
    let response = yield axios({
        method: 'GET',
        url: `/api/list/`,
        data: action.payload
})
    console.log('back from GET with:', response.data);
    yield put({
        type: 'SET_LIST',
        payload: response.data
    })
}
function* deleteListItem(action){
    console.log('in delete card with:', action);
    let response = yield axios ({
      method: 'DELETE',
      url: `api/list/${action.payload.id}`,
      data: action.payload
    })
    yield put({
      type: 'GET_LIST'
      })
  }
function* editListItem(action){
    console.log('in edit list item with:', action);
    let response = yield axios ({
        method: 'PUT',
        url: `api/list/${action.payload.id}`,
        data: action.payload
    })
    yield put({
        type: 'GET_LIST'
    })
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
  yield takeLatest('DELETE_LISTITEM', deleteListItem);
yield takeLatest('EDIT_LISTITEM', editListItem);

}

export default listSaga;
