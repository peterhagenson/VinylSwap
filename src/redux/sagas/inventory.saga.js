import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

//fetchAPI saga sends GET request to server for results that match the search term
//it then sends those results to the apiReducer
function* fetchAPI(action) {
    // console.log("in fetchAPI", action.payload)
    try{
        const apiResults = yield axios.get(`/inventoryAPI/${action.payload}`);
        // console.log('get all', apiResults.data.results);
        yield put({ type: 'SET_API_RESULTS', payload: apiResults.data.results})
    } catch {
        console.log('GET API RESULTS ERROR')
    }
};

//postAlbum() sends a POST request to the server with the user-chosen album to be added to the database as an inventory item 
function* postAlbum(action) {
// console.log("in postAlbum", action.payload)
try {
    yield axios.post('/inventoryAPI', action.payload)

// TODO - POSSIBLY ADD A GET/FETCH

}catch {
    console.error('ERROR IN POST')
}
}



function* inventorySaga() {
    // console.log("in inventorySaga")
    yield takeLatest('GET_SEARCH_RESULTS', fetchAPI)
    yield takeLatest('POST_TO_INVENTORY', postAlbum)
}

export default inventorySaga;