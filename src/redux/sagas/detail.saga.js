import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* getDetails(action) {
    console.log('in getDetails', action.payload)
    try{
        const albumDetails = yield axios.get(`/details/${action.payload}`)
        // console.log("get details response", albumDetails.data.album)
        let album = albumDetails.data.album;
        let user = albumDetails.data.user;
        let detailsPackage = {
            album: album,
            user: user,
        }
        console.log('detailsPackage: ', detailsPackage)
        yield put({type: 'SET_ALBUM_DETAILS', payload: detailsPackage});
    } catch  {
        console.log('GET DETAILS ERROR')
    }
}


function* detailSaga() {
    console.log("in detailSaga")
    yield takeLatest('GET_DETAILS', getDetails)
}

export default detailSaga;