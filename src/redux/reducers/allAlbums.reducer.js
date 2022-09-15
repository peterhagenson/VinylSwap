
//sets allAlbums, which are displayed on the search page 
const allAlbums = (state = [], action) => {
    switch (action.type) {
        case 'SET_ALL_ALBUMS':
            return action.payload;
        default:
            return state;
    }
}

export default allAlbums;