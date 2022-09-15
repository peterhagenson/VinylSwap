import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';


// getMatches sends GET request to the server with the search term as a parameter
function* getMatches(action) {
    // console.log('in getMatches', action.payload)
    try {
        const matches = yield axios.get(`/searchDB/${action.payload}`);
        // console.log('get results', matches.data)
        // sends search results to search.reducer
        yield put({ type: 'SHOW_RESULTS', payload: matches.data })
    } catch {
        console.log('GET MATCHES ERROR');
    }
};

// receives despatch from getAllAlbums on search page and sends request to server to get all albums
function* getAllAlbums() {
    try {
        const allAlbums = yield axios.get('/searchDB');
        yield console.log(allAlbums.data)
        // sends allAlbums to the allAlbums reducer
        yield put({ type: 'SET_ALL_ALBUMS', payload: allAlbums.data })
    } catch {
        console.log('GET ALL ALBUMS ERROR');
    }
}




function* searchSaga() {
    // console.log("in searchSaga")
    yield takeLatest('FETCH_SEARCH_RESULTS', getMatches)
    yield takeLatest('GET_ALL_ALBUMS', getAllAlbums)

}

export default searchSaga;

