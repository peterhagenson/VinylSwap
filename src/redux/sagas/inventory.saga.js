import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAPI() {

}

function* inventorySaga() {
    console.log("in inventorySaga")
    yield takeLatest('GET_SEARCH_RESULTS', fetchAPI)
}

export default inventorySaga;