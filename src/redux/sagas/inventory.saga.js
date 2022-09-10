import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';




//fetchAPI saga sends GET request to server for results that match the search term
//it then sends those results to the apiReducer
function* fetchAPI(action) {
    console.log("in fetchAPI", action.payload)
    try {
        const apiResults = yield axios.get(`/inventoryAPI/${action.payload}`);
        // console.log('get all', apiResults.data.results);
        yield put({ type: 'SET_API_RESULTS', payload: apiResults.data.results })
    } catch {
        console.log('GET API RESULTS ERROR')
    }
};

//postAlbum() sends a POST request to the server with the user-chosen album to be added to the database as an inventory item 
function* postAlbum(action) {
    try {
        console.log("in postAlbum", action)

        yield axios.post('/inventoryAPI', action.payload)
        action.callback();
        // yield put({ type: 'FETCH_ALBUM_TO_ADD' })

        // TODO - POSSIBLY ADD A GET/FETCH

    } catch (err) {
        console.error('ERROR IN POST', err)
    }
}

// deleteAlbum makes delete request to server (api.router) and dispatches 'GET_USER' which triggers the getProfile function in the profile.saga file and ultimately updates the browser
function* deleteAlbum(action) {
    // console.log("in deleteAlbum saga", action.payload)
    try {
        yield axios.delete(`/inventoryAPI/${action.payload}`)
        yield put({ type: 'GET_USER' })
    } catch (err) {
        console.error('ERROR IN DELETE', err)
    }
}

function* addDescriptors(action) {
    let discogsId = action.payload.discogsID;
    console.log("addDescriptors action.payload:", action.payload, discogsId)
    try {
        // console.lod('params:', params.id)
        yield axios.put('/inventoryAPI', action.payload)
        yield put({ type: 'FETCH_ALBUM_TO_ADD', payload: discogsId });
    } catch (err) {
        console.error('ERROR IN PUT', err)
    }
}

function* getAlbumToAdd(action) {
    console.log("in getAlbumToAdd client, ", action.payload)
    try {
        const album = yield axios.get(`/albumToAdd/${action.payload}`)
        // console.log("in getAlbumToAdd saga", album)
        yield put({ type: 'SET_ALBUM_TO_ADD', payload: album.data })
    } catch (err) {
        console.error('ERROR IN getAlbumToAdd', err)
    }
}



function* inventorySaga() {
    // console.log("in inventorySaga")
    yield takeLatest('GET_SEARCH_RESULTS', fetchAPI)
    yield takeLatest('POST_TO_INVENTORY_NO_DUPES', postAlbum)
    yield takeLatest('DELETE_LISTING', deleteAlbum)
    yield takeLatest('ADD_ALBUM_DESCRIPTORS', addDescriptors)
    yield takeLatest('FETCH_ALBUM_TO_ADD', getAlbumToAdd)
}

export default inventorySaga;