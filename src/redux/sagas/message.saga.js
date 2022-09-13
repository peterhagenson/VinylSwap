import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getThreads() {
    console.log('in get messages saga')
    try {
        const threads = yield axios.get('/message');
        // console.log(threads);
        yield put({ type: 'SET_MESSAGES', payload: threads.data })
    } catch {
        console.log("ERROR IN GET MESSAGES");
    }
}

function* sendMessage(action) {
    console.log('in message saga', action.payload)
    try {
        yield axios.post('/message', action.payload)
    } catch {
        console.log('POST MESSAGE ERROR')
    }
}

function* messageSaga() {
    yield takeLatest('SEND_MESSAGE', sendMessage);
    yield takeLatest('GET_THREADS', getThreads);
}

export default messageSaga;