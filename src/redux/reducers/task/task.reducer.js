import { taskConstants } from "../../types";

const initialState = {
    status: false,
    tasks: [],
    analytics: {
        total: 0,
        pending: 0,
        completed: 0
    },
    task: null
}

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case taskConstants.TASK_RESPONSE:
        case taskConstants.RESET_TASK_RESPONSE:
        case taskConstants.GET_TASKS:
        case taskConstants.GET_TASK:
        case taskConstants.GET_ANALYTICS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state
    }
}

export default taskReducer