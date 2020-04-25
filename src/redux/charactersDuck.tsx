import axios from "axios";

// constants
const initialData = {
  fetching: false,
  characters: [],
  currentChar: null,
  error: null,
};

export const LOGIN = "LOGIN";
export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
export const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

const URL = "https://rickandmortyapi.com/api/character";

// reducer
const reducer = (state = initialData, action: any) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true, error: null };
    case GET_CHARACTERS_ERROR:
      return { ...state, ...{ fetching: false, error: action.payload } };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, ...{ characters: action.payload, fetching: false } };
    default:
      return state;
  }
};

export default reducer;

// action creators
export const getCharactersAction = () => (
  dispatch: Function,
  getState: Function
) => {
  dispatch({ type: GET_CHARACTERS });

  return axios
    .get(URL)
    .then((res) => {
      dispatch({ type: GET_CHARACTERS_SUCCESS, payload: res.data.results });
    })
    .catch((err) => {
      dispatch({ type: GET_CHARACTERS_ERROR, payload: err.response.message });
    });
};
