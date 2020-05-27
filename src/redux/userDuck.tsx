import { loginWithGoogle, signOutGoogle } from "../services/firebase";
import { Dispatch } from "redux";

// constants
const initialData = {
  loggedIn: false,
  fetching: false,
  error: null,
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

// Auxiliar functions
const saveStorage = (storage: Object) => {
  localStorage.storage = JSON.stringify(storage);
};

// action creators
export const restoreSessionAction = () => (dispatch: Dispatch) => {
  let storage = localStorage.getItem("storage") || "{}";
  storage = JSON.parse(storage);
  if (storage && storage.hasOwnProperty("user")) {
    dispatch({ type: LOGIN_SUCCESS, payload: storage });
  }
};

export const logoutAction = () => (dispatch: Dispatch, getState: Function) => {
  signOutGoogle();
  dispatch({ type: LOG_OUT });
  localStorage.removeItem("storage");
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

      saveStorage(getState());
    })
    .catch((e) => {
      dispatch({
        type: LOGIN_ERROR,
        payload: e.message,
      });
    });
};
