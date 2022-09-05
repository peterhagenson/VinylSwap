
//this reducer deals with the album owner's profile info on the AlbumDetailPage

const ownerDetails = (state = [], action) => {
    console.log('album owner:', action.payload)
    switch (action.type) {
        case 'SET_ALBUM_OWNER':
            return action.payload;
        default:
            return state;
    }
}






export default ownerDetails;