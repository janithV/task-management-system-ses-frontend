import { backdropConstants } from "../../types";

const initialState = {
    visibility: false
}

const backdropReducer = (state = initialState, action) => {
    switch (action.type) {
        case backdropConstants.SHOW_BACKDROP:
        case backdropConstants.HIDE_BACKDROP:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}

export default backdropReducer