import { loginWithGoogle, signOutGoogle } from "../../services/firebase";
import { Dispatch } from "redux";
import { retrieveFavoritesAction } from "./charactersDuck";
import {
  saveStorage,
  getStorage,
  removeFromStorage,
} from "../../services/localstorage";

// constants
const initialData = {
  loggedIn: false,
  fetching: false,
  error: null,
  uid: null,
  displayName: null,
  email: null,
  photoUrl: null,
};

export const LOGIN = "LOGIN";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOG_OUT = "LOG_OUT";

// reducer
const reducer = (state = initialData, action: any) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, fetching: true };
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true };
    case LOGIN_ERROR:
      return { ...state, error: action.payload };
    case LOG_OUT:
      return { ...initialData };
    default:
      return state;
  }
};

export default reducer;

// action creators
export const restoreSessionAction = () => (
  dispatch: Dispatch,
  getState: Function
) => {
  let previousSession = getStorage("user");

  if (previousSession) {
    dispatch({ type: LOGIN_SUCCESS, payload: previousSession });
    retrieveFavoritesAction()(dispatch, getState);
  }
};

export const logoutAction = () => (dispatch: Dispatch, getState: Function) => {
  signOutGoogle();
  dispatch({ type: LOG_OUT });
  removeFromStorage();
};

export const doGoogleLoginAction = () => (
  dispatch: Function,
  getState: Function
) => {
  dispatch({ type: LOGIN });

  return loginWithGoogle()
    .then((user) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user?.uid,
          displayName: user?.displayName,
          email: user?.email,
          photoUrl: user?.photoURL,
        },
      });

      saveStorage("user", getState().user);
      retrieveFavoritesAction()(dispatch, getState);
    })
    .catch((e) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message,
      });
    });
};
