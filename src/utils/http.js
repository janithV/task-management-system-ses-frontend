import axios from "axios";
import {
    getAPITokens,
    setNewToken
} from "./functions";

let instance = axios.create()

let axioDefaults = {
    baseURL: process.env.REACT_APP_BASE_URL,
    timeout: JSON.parse(process.env.REACT_APP_REQUEST_TIMEOUT),
    headers: {
        'Content-Type': 'application/json',
        "X-Requested-With": "XMLHttpRequest",
    }
};
// common axios request handling function with helper functions

let axiosReq = async (config) => {

    try {

        // Add Authorization Header
        let access_token = getAPITokens("access");
        if (access_token) {
            axioDefaults.headers["Authorization"] = "Bearer " + access_token;
        }

        let newConfigs = {
            ...axioDefaults,
            headers: {
                ...axioDefaults.headers
            },
            ...config
        };


        let resp = await instance(newConfigs);
        return {
            isException: false,
            response: resp
        };
    } catch (err) {

        return {
            isException: true,
            error: err
        };
    }

};

export const postReq = async (config) => {
    let newConfig = {
        ...config,
        method: "post"
    };
    return await axiosReq(newConfig);
};


export const patchReq = async (config) => {
    let newConfig = {
        ...config,
        method: "patch"
    };
    return await axiosReq(newConfig);
};

export const getReq = async (config) => {
    let newConfig = {
        ...config,
        method: "get"
    };
    return await axiosReq(newConfig);
};

export const deleteReq = async (config) => {
    let newConfig = {
        ...config,
        method: "delete"
    };
    return await axiosReq(newConfig);
};

//check if the token has expired by comparing the expiry time with the current time
const isTokenExpired = () => {

    let sessionObj = getAPITokens("refresh");

    if (sessionObj) {

        const sessionTimeout = process.env.REACT_APP_SESSION_TIMEOUT;
        const now = Date.now();
        const expiry = Date.parse(sessionObj.accessTokenExpiry);

        let difference = Math.round((expiry - now) / 60000); //convert to minutes

        if (difference > 0 && difference <= sessionTimeout) {
            return false;
        }
        else {
            return true
        }

    }

    return false;

}

//retrieve a new access token using the refresh token
const refreshToken = async () => {

    let sessionObj = getAPITokens("refresh");
    axioDefaults.method = "GET"
    axioDefaults.url = "/auth/refresh-token"
    axioDefaults.headers["Authorization"] = "Bearer " + sessionObj.refreshToken;

    let resp = await axios(axioDefaults);

    if (resp.status === 200) {
        let newSession = resp.data;
        setNewToken(newSession);
        return true
    }
}

// axios request interceptor to check if the token has expired and refresh it
instance.interceptors.request.use(async function (req) {
    if (isTokenExpired()) {
        await refreshToken();
    }
    // Add Authorization Header
    let access_token = getAPITokens("access");
    if (access_token) {
        req.headers["Authorization"] = "Bearer " + access_token;
    }
    return req;
});