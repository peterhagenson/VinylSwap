//this reducer deals with the album details on the AlbumDetailsPage

const albumDetails = (state = {}, action) => {
    // console.log('album details reducer:', action.payload)
    switch (action.type) {
        case 'SET_ALBUM_DETAILS':
            return action.payload;
        default:
            return state;
    }
}



export default albumDetails;
