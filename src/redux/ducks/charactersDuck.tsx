import ApolloClient, { gql } from "apollo-boost";
import axios from "axios";
import { updateDB, getFavoriteCharacters } from "../../services/firebase";
import { saveStorage, getStorage } from "../../services/localstorage";

// constants
const initialData = {
  fetching: false,
  characters: [],
  currentChar: null,
  error: null,
  favorites: [],
};

export const LOGIN = "LOGIN";
export const GET_CHARACTERS = "GET_CHARACTERS";
export const GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
export const GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";
export const REMOVE_CHARACTER = "REMOVE_CHARACTER";
export const ADD_TO_FAVORITES = "ADD_TO_FAVORITES";
export const GET_FAVS = "GET_FAVS";
export const GET_FAVS_ERROR = "GET_FAVS_ERROR";
export const GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS";

const URL = "https://rickandmortyapi.com/api/character";

let client = new ApolloClient({ uri: "https://rickandmortyapi.com/graphql" });

// reducer
const reducer = (state = initialData, action: any) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return { ...state, fetching: true, error: null };
    case GET_CHARACTERS_ERROR:
      return { ...state, ...{ fetching: false, error: action.payload } };
    case GET_CHARACTERS_SUCCESS:
      return { ...state, ...{ characters: action.payload, fetching: false } };
    case REMOVE_CHARACTER:
      return { ...state, characters: action.payload };
    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload };
    case GET_FAVS:
      return {
        ...state,
        fetching: true,
        error: null,
      };

    case GET_FAVS_ERROR:
      return { ...state, ...{ fetching: false, error: action.payload } };
    case GET_FAVS_SUCCESS:
      return {
        ...state,
        ...{
          fetching: false,
          favorites: action.payload,
        },
      };
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

  let query = gql`
    {
      characters {
        results {
          name
          image
        }
      }
    }
  `;
  return client
    .query({ query })
    .then(({ data }) => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: data.characters.results,
      });
    })
    .catch((err) => {
      dispatch({ type: GET_CHARACTERS_ERROR, payload: err });
    });
};

export const removeCharacterAction = (index: number) => (
  dispatch: Function,
  getState: Function
) => {
  let { characters } = getState().characters;
  characters.splice(index, 1);

  dispatch({ type: REMOVE_CHARACTER, payload: [...characters] });
};

export const retrieveFavoritesAction = () => (
  dispatch: Function,
  getState: Function
) => {
  dispatch({ type: GET_FAVS });

  let { uid } = getState().user;
  getFavoriteCharacters(uid)
    .then((array) => {
      dispatch({ type: GET_FAVS_SUCCESS, payload: [...array] });
    })
    .catch((e) => {
      console.log({ e });
      dispatch({ type: GET_FAVS_ERROR, payload: e.message });
    });
};

export const restoreFavoritesAction = () => (dispatch: Function) => {
  let favorites = getStorage("favorites");
  dispatch({ type: GET_FAVS_SUCCESS, payload: favorites || [] });
};

export const addToFavoritesAction = () => (
  dispatch: Function,
  getState: Function
) => {
  let { characters, favorites } = getState().characters;

  let char = characters.shift();
  let newFavorites = [...favorites, char];

  // Save to firebase
  let { uid } = getState().user;
  updateDB(newFavorites, uid);
  // saveStorage("favorites", newFavorites);

  // I have to [...characters] due to redux state inmutability,
  // Redux compares if original array and new state array are the same
  // Here we deconstruct the chars and favorites directly from state and
  // we pass it back directly to redux.
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { characters: [...characters], favorites: [...newFavorites] },
  });
};
