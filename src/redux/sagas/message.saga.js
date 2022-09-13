import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getMessages() {
    console.log('in get messages saga')
    try {
        const messages = yield axios.get('/message');
        // console.log(messages);
        yield put({ type: 'SET_MESSAGES', payload: messages.data })
    } catch {
        console.log("ERROR IN GET MESSAGES");
    }
}

function* sendMessage(action) {
    // console.log('in message saga', action.payload)
    try {
        yield axios.post('/message', action.payload)
    } catch {
        console.log('POST MESSAGE ERROR')
    }
}

function* messageSaga() {
    yield takeLatest('SEND_MESSAGE', sendMessage);
    yield takeLatest('GET_MESSAGES', getMessages);
}

export default messageSaga;