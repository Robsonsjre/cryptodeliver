import {
  CHANGE_CURRENT_ADDRESS,
  CHANGE_PRODUCT_QUANTITY
} from "./types";

// import axios from "axios";

// export const changeCurrentProduct = option => dispatch => {
//   dispatch({ type: IS_LOADING_PRODUCT_TRUE });
//
//   setTimeout(function() {
//     dispatch({ type: CHANGE_CURRENT_PRODUCT, payload: { option } });
//   }, 2000);
// };

export const changeAddress = (value, history) => dispatch => {
  dispatch({ type: CHANGE_CURRENT_ADDRESS, payload: { value } });
  history.push("/products")
};

export const changeProductQuantity = (id, operation) => (dispatch, getState) => {
  const { current } = getState()
  dispatch({ type: CHANGE_PRODUCT_QUANTITY, payload: { id, operation, current } });
};
