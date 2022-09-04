import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addProfile(action) {
    // console.log("in addProfile", action.payload)
    try{
        yield axios.put('/profile', action.payload)
    } catch{
        console.log("error in post profile")
    }
}

function* getProfile() {
    // console.log('in getProfile SAGA');
    try {
        const profile = yield axios.get('/profile')
        // console.log(profile.data[0]);
        yield put({type: 'SET_PROFILE', payload: profile.data[0]})
        
    } catch {
        console.log("error in getProfile")
    }
}

function* getUserInventory() {
    // console.log('in get user inventory')
    try{
        const userInventory = yield axios.get('/userInventory')
        
        //userInventory is send to the userInventory.reducer
        yield put({type: 'SET_USER_INVENTORY', payload: userInventory.data})
    } catch {
        console.log("error in getUserInventory")
    }


}

function* profileSaga() {
    yield takeLatest('SEND_PROFILE', addProfile);
    yield takeLatest('GET_USER', getProfile);
    yield takeLatest('GET_USER_INVENTORY', getUserInventory);
}

export default profileSaga;

