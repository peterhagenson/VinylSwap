import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMatches(action) {
    console.log('in getMatches', action.payload)
    try{
        const matches = yield axios.get(`/searchDB/${action.payload}`);
        console.log('get results', matches.data)
        yield put({type: 'SHOW_RESULTS', payload: matches.data})
    } catch {
        console.log('GET MATCHES ERROR');
    }
    

};

function* searchSaga() {
    console.log("in searchSaga")
    yield takeLatest('FETCH_SEARCH_RESULTS', getMatches)
    
}

export default searchSaga;

