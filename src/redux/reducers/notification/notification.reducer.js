import { notificationConstants } from "../../types/index"

const initialState = {
    visibility: false,
    type: '',
    message: ''
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case notificationConstants.SHOW_NOTIFICATION:
        case notificationConstants.HIDE_NOTIFICATION:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}

export default notificationReducer;