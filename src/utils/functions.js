import { USER_SESSION_KEY } from "../configs/definitions";

export const isUndefined = (object) => {
  return typeof object === "undefined" || object === null;
};

export const isEmptyObj = (object) => {
  if (isUndefined(object)) {
    return true;
  } else {
    return Object.keys(object).length === 0 && object.constructor === Object;
  }
};

// returns access or refresh token based on the tokenType
export const getAPITokens = (tokenType) => {
  let userData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
  if (!isEmptyObj(userData)) {
    if (tokenType === "access" && userData.accessToken !== "") {
      return userData.accessToken;
    } 
    else if (tokenType === "refresh" && userData.refreshToken !== "") {
      return userData;
    } 
    else {
      return false;
    }
  }
  return false;
};

// update the user session data in the local storage
export const setNewToken = (sessionObj) => {

  let userData = JSON.parse(localStorage.getItem(USER_SESSION_KEY));
  userData = sessionObj;
  localStorage.setItem(USER_SESSION_KEY, JSON.stringify(userData));

}
