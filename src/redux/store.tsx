import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import userReducer from "./userDuck";
import charactersReducer from "./charactersDuck";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  user: userReducer,
});

export const composeEnhancers =
  (window && (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;

const generateStore = () => {
  let store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};

export default generateStore;
