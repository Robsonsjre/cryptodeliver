. [Overview](#overview)
1. [Project stack](#project-stack)
1. [Initial Boilerplate for React-Redux-Router](#initial-boilerplate-for-react-redux-router)
1. [Setup Client React Setup](#setup-client-react-setup)
1. [Deployment proccess](#deployment-proccess)

## Overview
=====================

Its necessary to run inside Mainframe Client

````javascript
yarn install
yarn start

http://localhost:3000
````

## Project Stack

- Node.js
- Firebase
- React & Redux
- Mainframe OS

## Setup Client React Setup
````javascript
1) Install React App //Voltar na aula que ele ensinou isso, já não lembro o que tenho que fazer
````

## Initial Boilerplate for React-Redux-Router
======================

- Import materialize direct, better for performance keep the style out of javascript
- Create store and applyMiddleware with reduxThunk
- Envolve the first react component App.js with provider passing store as props

````javascript
//index.js

import "materialize-css/dist/css/materialize.min.css"
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk'

import App from "./components/App";
import reducers from "./reducers"

const store = createStore(reducers, applyMiddleware(reduxThunk));

// Envolve the first top component with provider to give access to store from
//all components and pass store as a props.
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#root") //Id root at index.html
);
````
````javascript
//components/App.js

import "materialize-css/dist/css/materialize.min.css";
import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../actions";

import Header from "./Header";
import Landing from "./Landing";
const Dashboard = () => <h2>Dashboard</h2>;

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <div className="container">
            <Header />
            <Route path="/surveys" component={Dashboard} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default connect(
  null,
  actions
)(App);
````
````javascript
//reducers/index.js

import { combineReducers } from "redux";
import authReducer from "./dummyReducer";

export default combineReducers({
  auth: dummyReducer
})

````

````javascript
//reducers/dummyReducer.js

import { FETCH_USER } from '../actions/types'

export default function(state = null, action) {
  switch (action.type) {
    case FETCH_USER:
      return action.payload || false

    default:
      return state;
  }
}
````

````javascript
//actions/index.js

import axios from "axios";
import { FETCH_USER } from "./types";

export const fetchUser = () => async dispatch => {
    const res = await axios.get("/api/teste")

    dispatch({ type: FETCH_USER, payload: res.data });
};

````

````javascript
//actions/types.js

export const FETCH_USER = 'fetch_user'
````

## Email Provider Setup

Provider: SendGrid

1) Create account
2) Create API KEY: Settings > API KEY > Create your API KEY
3) Put the Key into the config/dev/key.js file and create the env variable into prod/key, add it to the env variables on Heroku/AWS
4) Install the npm module: sendgrid
