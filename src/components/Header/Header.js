import React from "react";
import "./styles.scss";
import Logo from "../../cryptodelivery_logo.png";

const Header = props => {
  return (
    <nav className="header-container">
      <div className="header-logo">
        <img src={Logo} alt="crypto_delivery_logo" />
      </div>
      {props.current.address ? (
        <div className="header-address">
          <div>
            <i
              style={{
                height: "100%",
                lineHeight: "100%",
                color: "#FCD500",
                marginRight: "3px",
                fontSize: "35px"
              }}
              className="material-icons"
            >
              location_on
            </i>
          </div>

          <div className="address-container">
            <div className="address-lineone">Deliver Address</div>
            <div className="address-linetwo">{props.current.address}</div>
          </div>
        </div>
      ) : null}
    </nav>
  );
};

export default Header;
