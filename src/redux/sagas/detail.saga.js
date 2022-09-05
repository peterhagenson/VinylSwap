import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getDetails(action) {
    // console.log('in getDetails', action.payload)
    try{
        const albumDetails = yield axios.get(`/details/${action.payload}`)
        // console.log("get details response", albumDetails.data)
        yield put({type: 'SET_ALBUM_DETAILS', payload: albumDetails.data[0]})
       
    } catch  {
        console.log('GET DETAILS ERROR')
    }
}


function* detailSaga() {
    yield takeLatest('GET_DETAILS', getDetails)
}

export default detailSaga;