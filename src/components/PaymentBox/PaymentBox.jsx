import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { calcCartTotal } from "../../utils";
import CircularProgress from "@material-ui/core/CircularProgress";

import "./styles.scss";
import * as actions from "../../actions";
import Stepper from "../Stepper/Stepper";

class PaymentBox extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "",
      step: 0,
      hashLink: ""
    };

    this.payCart = this.payCart.bind(this);
  }

  payCart = async () => {
    const { products, cart } = this.props.current;
    const cartTotal = calcCartTotal(products, cart);

    const paymentObj = {
      value: cartTotal,
      from: this.props.mainframe.sdk.ethereum.selectedAccount,
      to: "0x92F8C15C310476E69D4e8fe93ff4c8c7ECE1008a"
    };

    // this.props.paymentHandle(paymentObj, this.props.mainframe)

    // console.log('this.state', this.state.mainframe.payments)

    try {
      const res = await this.props.mainframe.sdk.ethereum.sendETH(paymentObj);
      res.on("hash", hash => {
        const hashLink = "https://ropsten.etherscan.io/tx/" + hash;
        this.setState({ step: 1, hashLink: hashLink });
      });

      res.on("confirmed", () => {
        console.log("confirmed transaction");
        this.setState({ step: 2 });

        this.props.cleanCart(this.props.history)
        //dispara action para change State
        // this.writeToFirebase(transactionData, recipient);
      });
    } catch (err) {
      console.log("err", err);
    }
  };

  render() {
    return (
      <div className="payment-container">
        <div className="payment-wrapper">
          <div className="payment-title-box">
            <h1>We are almost there!</h1>
          </div>
          <div className="paymeent-form-box">
            <Stepper
              activeStep={this.state.step}
              hashLink={this.state.hashLink}
            />
            {this.state.step === 0 ? (
              <div
                className="address-input-button"
                onClick={() => this.payCart()}
              >
                <div className="address-text">PAY NOW</div>
              </div>
            ) : null}
            {this.state.step === 1 ?
              <div>
                <div style={{marginBottom: "10px"}}> You can check your transaction on <a href={this.state.hashLink}>Etherscan</a></div>
                <CircularProgress />
            </div> : null}
            {this.state.step === 2 ?   <i
                style={{
                  height: "100%",
                  lineHeight: "100%",
                  marginRight: "5px",
                  fontSize: "35px",
                  color: "#fcd500"
                }}
                className="material-icons outlined"
              >
                done_all
              </i> : null }
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    current: state.current,
    mainframe: state.mainframe
  };
};

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    actions
  )
)(PaymentBox);
