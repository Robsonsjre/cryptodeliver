import { CHANGE_CURRENT_ADDRESS } from "../actions/types";
// import _ from "lodash";

const initialState = {
  isLoading: false,
  selectedProducts: [],
  address: "",
  totalPrice: 0
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENT_ADDRESS:
    console.log('action', action.payload)
      return Object.assign({}, state, {
        address: action.payload.value
      });

    default:
      return state;
  }
}
