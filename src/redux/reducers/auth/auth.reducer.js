import { authConstants } from "../../types";

const initialState = {
    isLogginSuccess: false,
    isRegisterSuccess: false,
    loginData: {}
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case authConstants.LOGIN_SUCCESS:
        case authConstants.REGISTER_SUCCESS:
        case authConstants.AUTH_UPDATE_LOGIN_DATA:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export default authReducer;