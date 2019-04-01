import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
// import authReducer from "./authReducer";
import currentReducer from "./currentReducer";
import mainframeReducer from "./mainframeReducer";

//redux-form need to be assigned to the key 'form'
export const createRootReducer = (history) => combineReducers({
  current: currentReducer,
  mainframe: mainframeReducer,
  store: {},
  router: connectRouter(history)
});
