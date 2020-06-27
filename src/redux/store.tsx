import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import userReducer, { restoreSessionAction } from "./ducks/userDuck";
import charactersReducer, {
  getCharactersAction,
  restoreFavoritesAction,
} from "./ducks/charactersDuck";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
  characters: charactersReducer,
});

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const generateStore = () => {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  // Dirty hack to call the action on application boot
  getCharactersAction()(store.dispatch, store.getState);

  restoreSessionAction()(store.dispatch);

  return store;
};

export default generateStore;
