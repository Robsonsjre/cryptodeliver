import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";
import {
  routerMiddleware,
  ConnectedRouter
} from "connected-react-router";

import { createBrowserHistory } from "history";
import axios from "axios";
import { createRootReducer } from "./reducers";
import { composeWithDevTools } from "redux-devtools-extension";

import './index.css';
import 'typeface-roboto'
import App from './App';
import * as serviceWorker from './serviceWorker';

const history = createBrowserHistory();
// Create store:
// 1) argument: Reducers
// 2) Middlewares, redux thunk and saga enters here
const initialState = {};
const store = createStore(
  createRootReducer(history),
  initialState,
  composeWithDevTools(
  applyMiddleware(routerMiddleware(history)),
  applyMiddleware(reduxThunk)
)
);

window.axios = axios;

ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
    </Provider>,
  document.querySelector("#root") //Id root at index.html
);
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
