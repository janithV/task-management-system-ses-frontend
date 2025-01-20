import { backdropConstants } from "../../types"

//show backdrop loading screen action creator
export const showBackdrop = () => (dispatch) => {
    dispatch({
        type: backdropConstants.SHOW_BACKDROP,
        payload: {
            visibility: true
        }
    })
}

//hide backdrop loading screen action creator
export const hideBackdrop = () => (dispatch) => {
    dispatch({
        type: backdropConstants.HIDE_BACKDROP,
        payload: {
            visibility: false
        }
    })
}