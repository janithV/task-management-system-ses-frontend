import { hideBackdrop, showBackdrop } from "../common/backdrop.actions"
import { authConstants } from "../../types"
import { postReq } from "../../../utils/http"
import { showNotification } from "../common/notification.actions"
import { USER_SESSION_KEY } from "../../../configs/definitions"


export const login = ( payload) => async (dispatch) => {

    dispatch(showBackdrop())

    let config = {
        url: "auth/login",
        data: payload
    }

    let response = await postReq(config);
    console.log('response',response);
    
    if (!response.isException) {
        if (response.response.status === 200){
            let userData = response.response.data;
            localStorage.setItem(USER_SESSION_KEY, JSON.stringify(userData));

            let payload = {
                isLogginSuccess: true,
                loginData: userData
            }
            dispatch({type: authConstants.LOGIN_SUCCESS, payload: payload});
        }
    } else {
       
        let payload = {
            isLogginSuccess: false,
            loginData: {}
        }
        dispatch (showNotification({
            visibility: true,
            type: 'error',
            message: response.error.response.data.message ?? "Login failed"

        }))
        dispatch({type: authConstants.LOGIN_SUCCESS, payload: payload});
    }
    dispatch(hideBackdrop());
    
}
export const destroyLoginData = () => async (dispatch) => {
    dispatch(showBackdrop());

    localStorage.clear();
    sessionStorage.clear();

    let payload = {
        isLogginSuccess: false,
        loginData: {}
    }

    dispatch({type: authConstants.LOGIN_SUCCESS, payload: payload});

    dispatch(hideBackdrop());
}

export const setLoginData = (data, isLogin) => (dispatch) => {
    dispatch({
        type: authConstants.AUTH_UPDATE_LOGIN_DATA,
        payload: { loginData: data, isLogginSuccess: isLogin }
    });
};

export const register = (payload) => async(dispatch) => {
    dispatch(showBackdrop())

    let config = {
        url: "auth/register",
        data: payload
    }

    let response = await postReq(config);
    if (!response.isException) {
        if (response.response.data.statusCode === 201){

            dispatch(showNotification({
                visibility: true,
                type: "Success",
                message: response.response.data.message
            }));

            let payload = {
                isRegisterSuccess: true,
            }

            dispatch({type: authConstants.REGISTER_SUCCESS, payload: payload});
        }
    }
    else {
        let payload = {
            isRegisterSuccess: false,
        }
        dispatch (showNotification({
            visibility: true,
            type: 'error',
            message: response.error.response.data.error

        }))
        dispatch({type: authConstants.REGISTER_SUCCESS, payload: payload});
    }

    dispatch(hideBackdrop());

}

export const updateRegisterStatus = () => (dispatch) => {
    dispatch({
        type: authConstants.REGISTER_SUCCESS,
        payload: { isRegisterSuccess: false }
    });
};

