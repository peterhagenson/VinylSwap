const albumToAdd = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALBUM_TO_ADD':
            return action.payload;
        default:
            return state;
    }
}

export default albumToAdd;