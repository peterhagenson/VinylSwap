

const userInventoryReducer = (state = {}, action) => {
    switch (action.type) {
        case 'SET_USER_INVENTORY':
            return action.payload;
        default:
            return state;
    }
    
}

export default userInventoryReducer;