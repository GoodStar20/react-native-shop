export const SIGN_UP = 'SIGN_UP';
export const LOGIN = 'LOGIN';
export const AUTHENTICATE = 'AUTHENTICATE';
export const LOGOUT = 'LOGOUT';
export const TOKEN_IS_STILL_VALID = 'TOKEN_IS_STILL_VALID';
import { AsyncStorage } from 'react-native';

export const tokeIsStillValid = (flag) => {
  return { type: TOKEN_IS_STILL_VALID, flag: flag }
}

export const authenticate = (userId, token) => {
  return {
    type: AUTHENTICATE,
    userId: userId,
    token: token
  }
};

export const signUp = (email, password) => {

  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAZmxBzMrvM2QHWOsBFCfyup791xJGrVAo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    const resData = await response.json();
    let errorMessage = null;
    if (!response.ok) {
      errorMessage = resData.error.errors[0].message;
      throw new Error(errorMessage);
    }
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    dispatch(authenticate(resData.localId, resData.idToken));
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  }
}


export const signIn = (email, password) => {

  return async dispatch => {
    const response = await fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAZmxBzMrvM2QHWOsBFCfyup791xJGrVAo',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
          returnSecureToken: true
        })
      }
    );
    const resData = await response.json();
    if (!response.ok) {
      throw new Error(resData.error.errors[0].message);
    }
    dispatch(authenticate(resData.localId, resData.idToken));
    const expirationDate = new Date(
      new Date().getTime() + parseInt(resData.expiresIn) * 1000);
    // save it in the device when the app restarts
    saveDataToStorage(resData.idToken, resData.localId, expirationDate);
  }
}

export const logout = () => {
  return {
    type: LOGOUT
  }
};

const saveDataToStorage = (token, userId, expirationDate) => {
  // save object as a string to the device  
  AsyncStorage.setItem(
    // userData = key
    'userData',
    JSON.stringify({
      token: token,
      userId: userId,
      expireDate: expirationDate.toISOString()
    }));
};



