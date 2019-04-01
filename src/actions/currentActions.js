import {
  CHANGE_CURRENT_ADDRESS,
  CHANGE_PAYMENT_STATUS,
  CLEAN_CART,
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

export const paymentHandle = (paymentObj, mainframe) =>  async (dispatch, getState) =>  {
  try {
    dispatch({ type: CHANGE_PAYMENT_STATUS, payload: { status: "sending"} });
    const res = await mainframe.ethereum.sendETH(paymentObj);
    res.on("hash", hash => {
      console.log("hash", hash);
      dispatch({ type: CHANGE_PAYMENT_STATUS, payload: { status: "confirming", tHash: hash} });
    });

    res.on("confirmed", () => {
      console.log("transação confirmada");

      dispatch({ type: CHANGE_PAYMENT_STATUS, payload: { status: "confirmed"} });
      // this.writeToFirebase(transactionData, recipient);
    });


  } catch(err) {
    console.log('err', err)
  }

}

export const cleanCart = (history) => (dispatch, getState) => {
  dispatch({ type: CLEAN_CART });
  setTimeout(function() {
    history.push('/')
  }, 8000);
};
