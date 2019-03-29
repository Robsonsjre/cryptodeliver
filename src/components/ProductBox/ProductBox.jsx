import React from "react";
import PropTypes from "prop-types";
import _ from 'lodash'
// import { formatPriceNumber } from "../../utils/auxFunctions";
import "./styles.scss";

function findQuantity(cart, id) {
  const currentProduct = _.find(cart, item => item.id === id);
  return currentProduct ? currentProduct.quantity : 0
}

const ProductBox = props => {
  const { name, price, imgUrl, cart, id, onClickButton } = props;

  const quantity = findQuantity(cart, id);
  return (
    <div className="product-card">
      <div className="product-name">{name}</div>
      <div className="product-image">
        <img alt={`${name}-small`} src={imgUrl} />
      </div>
      <div className="product-price">
        {/* <h6>{`${formatPriceNumber(price)}`}</h6> */}
        <div>{price}</div>
      </div>
      <div className="product-buttons">
        <div onClick={ () => onClickButton(id, "minus")} className="product-buttons-square red">
          <div>-</div>
        </div>
        <div className="product-buttons"> {quantity} </div>
        <div onClick={ () => onClickButton(id, "plus")} className="product-buttons-square white">
          <div>+</div>
        </div>
      </div>
    </div>
  );
};

ProductBox.defaultProps = {
  name: "product name",
  price: "1",
  imgUrl: "",
  quantity: 0
};

ProductBox.propTypes = {
  name: PropTypes.string,
  price: PropTypes.number,
  imgUrl: PropTypes.string,
  onClickButton: PropTypes.func
}

export default ProductBox;
