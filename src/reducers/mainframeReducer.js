import {
  CONFIG_WEB3
} from "../actions/types";

const initialState = {
  web3: null,
  sdk: null,
  network: "",
  account: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CONFIG_WEB3:
      console.log("action", action.payload);
      return Object.assign({}, state, {
        web3: action.payload.web3,
        sdk: action.payload.sdk,
      });

      default: return state
  }
}
