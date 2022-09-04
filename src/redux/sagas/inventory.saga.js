import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAPI(action) {
    console.log("in fetchAPI", action.payload)
    try{
        const apiResults = yield axios.get(`/getAPI/${action.payload}`);
        console.log('get all', apiResults.data.results);
        yield put({ type: 'SET_API_RESULTS', payload: apiResults.data.results})
    } catch {
        console.log('GET API RESULTS ERROR')
    }

}

function* inventorySaga() {
    console.log("in inventorySaga")
    yield takeLatest('GET_SEARCH_RESULTS', fetchAPI)
}

export default inventorySaga;