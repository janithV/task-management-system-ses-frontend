import { deleteReq, getReq, patchReq, postReq } from "../../../utils/http";
import { taskConstants } from "../../types";
import { hideBackdrop, showBackdrop } from "../common/backdrop.actions"
import { showNotification } from "../common/notification.actions"

export const createTask = (task) => async (dispatch) => {
    dispatch(showBackdrop())

    let config = {
        url: "tasks",
        data: task
    }

    let response = await postReq(config);
    console.log('response', response);
    if (!response.isException) {
        if (response.response.data.statusCode === 201) {

            dispatch(showNotification({
                visibility: true,
                type: "Success",
                message: response.response.data.message
            }));

            let payload = {
                status: true,
            }
            dispatch({type: taskConstants.TASK_RESPONSE, payload: payload});
        }
    } else {
        let payload = {
            status: false,
        }
        dispatch (showNotification({
            visibility: true,
            type: 'error',
            message: response.error.response.data.error

        }))

        dispatch({type: taskConstants.TASK_RESPONSE, payload: payload});
    }

     dispatch(hideBackdrop());
}

export const resetTaskResponse = () => async (dispatch) => {
    let payload = {
        status: false
    }
    dispatch({type: taskConstants.RESET_TASK_RESPONSE, payload: payload});
}

export const getTasks = (filter) => async (dispatch) => {
    dispatch(showBackdrop())

    let config = {
        url: "tasks"
    }

    if (filter) {
        config.params = {
            filter: filter
        }
    }

    let response = await getReq(config);
    console.log('response', response);
    if (!response.isException) {
        if (response.response.data.statusCode === 200) {
            let payload = {
                tasks: response.response.data.data
            }
            dispatch({type: taskConstants.GET_TASKS, payload: payload});
        }
    } else {
        dispatch(showNotification({
            visibility: true,
            type: 'error',
            message: response.error.response.data.error
        }))
    }

    dispatch(hideBackdrop());
}

export const getAnalytics = () => async (dispatch) => {
    dispatch(showBackdrop())

    let config = {
        url: "tasks/analytics"
    }

    let response = await getReq(config);
    console.log('response', response);
    if (!response.isException) {
        if (response.response.data.statusCode === 200) {
            let payload = {
                analytics: response.response.data.data
            }
            dispatch({type: taskConstants.GET_ANALYTICS, payload: payload});
        }
    } else {
        dispatch(showNotification({
            visibility: true,
            type: 'error',
            message: response.error.response.data.error
        }))
    }

    dispatch(hideBackdrop());
}

export const deleteTask = (id) => async(dispatch) => {
    dispatch(showBackdrop())

    let config = {
        url: `tasks/${id}`
    }

    let response = await deleteReq(config);
    console.log('response', response);
    if (!response.isException) {
        if (response.response.data.statusCode === 200) {
            dispatch(showNotification({
                visibility: true,
                type: 'success',
                message: response.response.data.message
            }))

            dispatch(getTasks())
            dispatch(getAnalytics())
        }
    } else {
        dispatch(showNotification({
            visibility: true,
            type: 'error',
            message: response.error.response.data.error
        }))
    }

    dispatch(hideBackdrop());
}

export const getTask = (id) => async(dispatch) => {
    dispatch(showBackdrop())

    let config = {
        url: `tasks/${id}`
    }

    let response = await getReq(config);
    if (!response.isException) {
        if (response.response.data.statusCode === 200) {
            let payload = {
                task: response.response.data.data
            }
            dispatch({type: taskConstants.GET_TASK, payload: payload});
        }
    } else {
        dispatch(showNotification({
            visibility: true,
            type: 'error',
            message: response.error.response.data.error
        }))
    }

    dispatch(hideBackdrop());
}

export const updateTask = (task, id) => async(dispatch) => {
    dispatch(showBackdrop())

    let config = {
        url: `tasks/${id}`,
        data: task
    }

    let response = await patchReq(config);
    if (!response.isException) {
        if (response.response.data.statusCode === 200) {
            dispatch(showNotification({
                visibility: true,
                type: 'success',
                message: response.response.data.message
            }))

            let payload = {
                status: true
            }
            dispatch({type: taskConstants.TASK_RESPONSE, payload: payload});
        }
    } else {
        dispatch(showNotification({
            visibility: true,
            type: 'error',
            message: response.error.response.data.error
        }))
    }

    dispatch(hideBackdrop());
}

export const resetTask = () => async(dispatch) => {
    let payload = {
        task: null
    }
    dispatch({type: taskConstants.GET_TASK, payload: payload});
}