import { backdropConstants } from "../../types"

export const showBackdrop = () => (dispatch) => {
    dispatch({
        type: backdropConstants.SHOW_BACKDROP,
        payload: {
            visibility: true
        }
    })
}

export const hideBackdrop = () => (dispatch) => {
    dispatch({
        type: backdropConstants.HIDE_BACKDROP,
        payload: {
            visibility: false
        }
    })
}