import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
// import authReducer from "./authReducer";
// import currentReducer from "./currentReducer";
// import storeReducer from "./storeReducer";

//redux-form need to be assigned to the key 'form'
export const createRootReducer = (history) => combineReducers({
  current: {},
  store: {},
  router: connectRouter(history)
});
