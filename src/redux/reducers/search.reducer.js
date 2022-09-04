const searchReducer = (state = [], action) => {
    // console.log('in searchReducer')
    switch (action.type) {
        case 'SHOW_RESULTS':
            return action.payload;
        default:
            return state;
    }

}

export default searchReducer;