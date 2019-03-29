import _ from "lodash";

export const calcCartTotal = (products, cart) => {
  let cartTotal = 0;
  _.each(cart, item => {
    const productObj = _.find(products, product => item.id === product.id);
    cartTotal += item.quantity * productObj.price
  });
  return cartTotal;
};
