const albumDetails = (state = {}, action) => {
    switch (action.type) {
        case 'SET_ALBUM_DETAILS':
            return action.payload;
        default:
            return state;
    }
}

export default albumDetails;