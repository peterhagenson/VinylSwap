import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* addProfile(action) {
    // console.log("in addProfile", action.payload)
    try {
        console.log('addProfile payload', action.payload)
        yield axios.put('/profile', action.payload);
        yield put({ type: 'GET_USER' });
        // history.push('/userProfile')

    } catch {
        console.log("error in post profile")
    }
}

function* getProfile() {
    console.log('in getProfile SAGA');
    try {
        const profile = yield axios.get('/profile')
        // console.log('in get pr0file', profile.data);
        yield put({ type: 'SET_PROFILE', payload: profile })

    } catch {
        console.log("error in getProfile")
    }
}

// function* getUserInventory() {
//     // console.log('in get user inventory')
//     try{
//         const userInventory = yield axios.get('/userInventory')
//         console.log(userInventory.data)
//         //userInventory is send to the userInventory.reducer
//         yield put({type: 'SET_USER_INVENTORY', payload: userInventory.data})
//     } catch {
//         console.log("error in getUserInventory")
//     }


// }

function* profileSaga() {
    yield takeLatest('SEND_PROFILE', addProfile);
    yield takeLatest('GET_USER', getProfile);
    // yield takeLatest('GET_USER_INVENTORY', getUserInventory);
}

export default profileSaga;

