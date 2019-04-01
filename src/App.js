import React, { Component } from "react";
import MainframeSDK from "@mainframe/sdk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { compose } from "redux";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
// import getWeb3 from "./components/utils/getWeb3";
import * as actions from "./actions";

import Web3 from "web3";

import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddressBox from "./components/AddressBox/AddressBox";
import ProductGrid from "./components/ProductGrid/ProductGrid";
import PaymentBox from "./components/PaymentBox/PaymentBox";

const Teste = () => <div> Teste </div>;

class App extends Component {
  constructor() {
    super();

    this.state = {
      mainframe: null,
      web3: null,
      account: null,
      network: null
    };
  }

  async componentDidMount() {
    try {
      const sdk = new MainframeSDK();
      // Get network provider and web3 instance.
      const web3 = await new Web3(sdk.ethereum.web3Provider);

      // Set web3 to the state
      this.setState({ web3: web3, mainframe: sdk });
      this.props.setInitialMainframeConfig(web3, sdk)
      // initial fetch of blockchain data
      this.getBlockchainData();

      // even listener for account & network updates
      sdk.ethereum.on("accountsChanged", accounts => {
        this.getBlockchainData();
      });
      sdk.ethereum.on("networkChanged", network => {
        this.getBlockchainData();
      });
    } catch (err) {
      console.log("Not possible to connect to mainframe SDK", err);
    }
  }

  getBlockchainData = async () => {
    try {
      // Use web3 to get the user's accounts.
      const account = this.state.mainframe.ethereum.selectedAccount;
      const network = this.state.mainframe.ethereum.networkVersion;

      console.log("account", account);
      console.log("network", network);

      // Set accounts and network to the state
      if (
        account !== undefined &&
        network !== undefined &&
        (!this.state.account ||
          !this.state.network ||
          this.state.account !== account ||
          this.state.network !== network)
      ) {
        this.setState({ account, network, staticBalance: null });
      }
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(`Failed to load web3 or accounts. Check the console for details.`);
      console.error(error);
    }
  };

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header {...this.props.current} />
            <Switch>
              <div className="content-container">
                <Route exact path="/" component={AddressBox} />
                <Route path="/products" component={ProductGrid} />
                <Route path="/payments" component={PaymentBox} {...this.props.current} />
                <Route path="/admin" component={Teste} />
              </div>
            </Switch>
            <Footer {...this.props.current} payCart={this.payCart} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  console.log('state', state)
  return {
    current: state.current
  };
};

export default connect(mapStateToProps, actions)(App);
