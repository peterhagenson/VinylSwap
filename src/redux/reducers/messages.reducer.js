const messagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_MESSAGES':
            return action.payload;
        default:
            return state;
    }
}

export default messagesReducer;