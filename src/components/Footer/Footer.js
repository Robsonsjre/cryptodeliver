import React from "react";
import PropTypes from "prop-types";
import { calcCartTotal } from "../../utils"

import "./styles.scss";

const Footer = props => {
  const buttonColor = props.address ? "black" : "rgba(0, 0, 0, 0.22)"
  const cartTotalString = calcCartTotal(props.products, props.cart).toString()
  const firstPart = cartTotalString.split('.')[0]
  const secondPart = cartTotalString.split('.')[1]
  return (
    <div className="footer-container">
      <div className="footer-itens-box">
        <div className="products-cart-total">TOTAL</div>
        <div className="products-cart-value">
          <span className="products-cart-currency">ETH</span>
          <span className="products-cart-price">{`${firstPart}.`}</span>
          <span className="products-cart-cents">{secondPart}</span>
        </div>
      </div>
      <div className="products-cart-button" style={{backgroundColor: buttonColor}}>
        <div className="cart-button-wrap">
          <i
            style={{
              height: "100%",
              lineHeight: "100%",
              marginRight: "5px",
              fontSize: "35px"
            }}
            className="material-icons outlined"
          >
            shopping_cart
          </i>
          <div style={{width: "120px"}}>GO DELIVER NOW!</div>
        </div>
      </div>
    </div>
  );
};

Footer.propTypes = {
  address: PropTypes.string,
  totalValue: PropTypes.number
};

Footer.defaultProps = {
  address: "",
  totalValue: "0000"
};

export default Footer;
