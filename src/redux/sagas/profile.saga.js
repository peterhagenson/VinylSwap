import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addProfile(action) {
    console.log("in addProfile", action.payload)
    try{
        yield axios.put('/profile', action.payload)
    } catch{
        console.log("error in post profile")
    }
}

function* profileSaga() {
    yield takeLatest('SEND_PROFILE', addProfile);
}

export default profileSaga;

