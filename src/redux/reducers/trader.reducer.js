const traderReducer = (state = [], action) => {
    // console.log("in traderReducer reducer", action.payload)
    switch (action.type) {
        case 'SET_TRADER':
            return action.payload;
        default:
            return state;

    }
}



export default traderReducer;
