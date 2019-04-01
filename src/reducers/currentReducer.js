import {
  CHANGE_CURRENT_ADDRESS,
  CHANGE_PRODUCT_QUANTITY,
  CLEAN_CART,
  CHANGE_PAYMENT_STATUS
} from "../actions/types";
import _ from "lodash";

const products = [
  {
    id: 1,
    name: "Pepsi 355ml - Unit",
    imgUrl:
      "https://s3-us-west-2.amazonaws.com/courier-images-prod/product/00009207_5a962b14-f4ff-4233-8f14-eacb824f8b0b.jpg",
    price: 0.1325
  },
  {
    id: 2,
    name: "Wine - Unit",
    imgUrl:
      "https://s3-us-west-2.amazonaws.com/courier-images-prod/product/00009708_7bc77de9-c1e5-4359-a297-9920821720df.jpg",
    price: 0.002
  },
  {
    id: 3,
    name: "Pepsi 355ml - Unit",
    imgUrl:
      "https://s3-us-west-2.amazonaws.com/courier-images-prod/product/00009207_5a962b14-f4ff-4233-8f14-eacb824f8b0b.jpg",
    price: 0.075
  },
  {
    id: 4,
    name: "Soda 200ml - Unit",
    imgUrl:
      "https://s3-us-west-2.amazonaws.com/courier-images-prod/product/00009210_a615b544-994b-4598-a2e2-0671b641d4ff.jpg",
    price: 0.0012
  },
  {
    id: 5,
    name: "Wine- Unit",
    imgUrl:
      "https://s3-us-west-2.amazonaws.com/courier-images-prod/product/00009708_7bc77de9-c1e5-4359-a297-9920821720df.jpg",
    price: 0.02
  }
];

const initialState = {
  isLoading: false,
  products: products,
  cart: [],
  address: "",
  paymentStatus: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANGE_CURRENT_ADDRESS:
      console.log("action", action.payload);
      return Object.assign({}, state, {
        address: action.payload.value
      });

    case CHANGE_PRODUCT_QUANTITY:
      console.log("action", action.payload);
      const productId = action.payload.id;
      const operation = action.payload.operation;
      const cart = action.payload.current.cart;

      const objSelectedProd = _.find(
        cart,
        product => productId === product.id
      );

      if (!objSelectedProd && operation === "minus") return state;
      if (!objSelectedProd && operation === "plus") {
        const newCart = [
          ...cart,
          { id: productId, quantity: 1 }
        ];
        return Object.assign({}, state, {
          cart: newCart
        });
      }

      if (objSelectedProd && operation === "plus") {
        const newCart = _.map(cart, product => {
          if (product.id === productId) {
            const oldQuantity = product.quantity;
            const newProduct = Object.assign({}, product, {
              quantity: oldQuantity + 1
            });
            return newProduct;
          } else return product;
        });
        return Object.assign({}, state, {
          cart: newCart
        });
      }

      if (objSelectedProd && operation === "minus") {
        const newCart = _.map(cart, product => {
          if (product.id === productId) {
            const oldQuantity = product.quantity;
            const newQuantity = oldQuantity - 1
            let newProduct = null

            if (!newQuantity) return newProduct
            else {
              newProduct = Object.assign({}, product, {
                quantity: newQuantity
              });
              return newProduct;
            }
          } else return product;
        });
        const newCartClean =  _.compact(newCart)
        return Object.assign({}, state, {
          cart: newCartClean
        });
      }
      break

      case CHANGE_PAYMENT_STATUS:
      return Object.assign({}, state, {
        paymentStatus: action.payload.status
      });

      case CLEAN_CART:
      return Object.assign({}, state, {
        paymentStatus: "",
        cart: [],
        address: ""
      });

    default:
      return state;
  }
}
