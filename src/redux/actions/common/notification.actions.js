import { notificationConstants } from "../../types"

//show the toast notification
export const showNotification = (payload) => (dispatch) => {
    dispatch({
        type: notificationConstants.SHOW_NOTIFICATION,
        payload: payload
    })
}

//hide the toast notification
export const hideNotification = (payload) => (dispatch) => {
    dispatch({
        type: notificationConstants.HIDE_NOTIFICATION,
        payload: payload
    })
}