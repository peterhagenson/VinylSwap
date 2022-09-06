import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getTrader(action) {
    console.log('in getTrader saga', action.payload)
    try{
        const trader = yield axios.get(`/trader/${action.payload}`)
        console.log('trader response', trader.data);
        yield put({type: 'SET_TRADER', payload: trader.data})
       
    } catch  {
        console.log('GET TRADER ERROR')
    }
}


function* traderSaga() {
    yield takeLatest('GET_TRADER', getTrader)
}

export default traderSaga;