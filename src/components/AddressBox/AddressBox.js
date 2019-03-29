import React from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { withRouter } from "react-router-dom";

import "./styles.scss";
import * as actions from "../../actions";

class AddressBox extends React.Component {
  constructor() {
    super();
    this.state = {
      value: ""
    };
  }
  render() {
    return (
      <div className="address-container">
        <div className="address-title-box">
          <h1>Cold, fast and descentralized drinks</h1>
          <h2>Enjoy it anytime</h2>
        </div>
        <label>DELIVER ADDRESS</label>
        <div className="address-form-box">
          <input
            className="address-input"
            onChange={e => {
              this.setState({ value: e.target.value });
            }}
          />
          <div
            onClick={() => this.props.changeAddress(this.state.value, this.props.history)}
            className="address-input-button"
          >
            <div className="address-text">SEE PRODUCTS</div>
          </div>
        </div>
      </div>
    );
  }
}

export default compose(
  withRouter,
  connect(
    "",
    actions
  )
)(AddressBox);
