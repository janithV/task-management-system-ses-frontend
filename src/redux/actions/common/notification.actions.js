import { notificationConstants } from "../../types"

export const showNotification = (payload) => (dispatch) => {
    dispatch({
        type: notificationConstants.SHOW_NOTIFICATION,
        payload: payload
    })
}

export const hideNotification = (payload) => (dispatch) => {
    dispatch({
        type: notificationConstants.HIDE_NOTIFICATION,
        payload: payload
    })
}