import React from "react";
import "./styles.scss";

const Footer = props => {
  const buttonColor = props.current && props.current.address ? "black" : "rgba(0, 0, 0, 0.22)"
  return (
    <div className="footer-container">
      <div className="footer-itens-box">
        <div className="products-cart-total">TOTAL</div>
        <div className="products-cart-value">
          <span className="products-cart-currency">ETH</span>
          <span className="products-cart-price">0.</span>
          <span className="products-cart-cents">0324</span>
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

export default Footer;
