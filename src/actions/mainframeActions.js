import {
  CONFIG_WEB3
} from "./types";

export const setInitialMainframeConfig = (web3, sdk) => dispatch => {
  dispatch({ type: CONFIG_WEB3, payload: { web3, sdk } });
};
