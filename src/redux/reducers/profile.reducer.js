const profileReducer = (state = {}, action) => {
    // console.log("in profile reducer", action.payload)
    switch (action.type) {
        case 'SET_PROFILE':
            return action.payload;
        default:
            return state;

    }
}



export default profileReducer;
