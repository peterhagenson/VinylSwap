
const apiReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_API_RESULTS':
            return action.payload;
        default:
            return state;
    }
}

export default apiReducer;