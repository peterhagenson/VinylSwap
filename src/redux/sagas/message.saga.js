import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getThreads() {
    console.log('in get messages saga')
    try {
        const threads = yield axios.get('/threads');
        // console.log(threads);
        yield put({ type: 'SET_THREADS', payload: threads.data })
    } catch {
        console.log("ERROR IN GET MESSAGES");
    }
}

function* sendMessage(action) {
    console.log('in message saga', action.payload)
    try {
        yield axios.post('/messages', action.payload)
    } catch {
        console.log('POST MESSAGE ERROR')
    }
}

function* getMessages(action) {
    console.log('in getMessages', action.payload);
    try {
        const messages = yield axios.get(`/messages/${action.payload}`)
        yield put({ type: 'SET_MESSAGES', payload: messages.data })
    } catch {
        console.log("ERROR IN GET MESSAGES");
    }
}

function* sendResponse(action) {
    console.log('in sendResponse', action.payload);
    try {
        let code = action.payload.code;
        yield axios.post('/messages/response', action.payload);
        yield put({ type: 'GET_MESSAGES', payload: code })
        console.log('code', code);
    } catch {
        console.log("ERROR IN SEND RESPONSE");
    }
}

function* messageSaga() {
    yield takeLatest('SEND_MESSAGE', sendMessage);
    yield takeLatest('GET_THREADS', getThreads);
    yield takeLatest('GET_MESSAGES', getMessages);
    yield takeLatest('SEND_RESPONSE', sendResponse);

}

export default messageSaga;