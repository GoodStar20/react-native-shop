import { SIGN_UP, LOGIN, AUTHENTICATE, LOGOUT, TOKEN_IS_STILL_VALID } from '../actions/auth';

const initialState = {
  token: null,
  userId: null,
  isLoggedIn: false
};


export default (state = initialState, action) => {
  switch (action.type) {
    //both sign up and login merged
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId,
      }

    case LOGOUT:
      return initialState;

    case TOKEN_IS_STILL_VALID:
      return {
        ...state,
        isLoggedIn: action.flag
      }

  }
  return state;
}