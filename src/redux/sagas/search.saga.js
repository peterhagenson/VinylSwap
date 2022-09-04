import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMatches(action) {
    console.log('in getMatches', action.payload)
    

};

function* searchSaga() {
    console.log("in searchSaga")
    yield takeLatest('FETCH_SEARCH_RESULTS', getMatches)
    
}

export default searchSaga;

