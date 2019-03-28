import React, { Component } from "react";
import MainframeSDK from "@mainframe/sdk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import getWeb3 from "./components/utils/getWeb3";

import logo from "./logo.svg";
import "./App.css";
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import AddressBox from "./components/AddressBox/AddressBox"

const Teste = () => <div> Teste </div>;

class App extends Component {
  state = {
    mainframe: null,
    web3: null,
    account: null,
    network: null
  };

  async componentDidMount() {
    try {
      const sdk = new MainframeSDK();
      // Get network provider and web3 instance.
      const web3 = await getWeb3(sdk);

      // Set web3 to the state
      this.setState({ web3: web3, mainframe: sdk });
    } catch (err) {
      console.log("Not possible to connect to mainframe SDK", err);
    }
  }

  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <div>
            <Header current={{address: "London Bridge, 128"}} />
            <Switch>
              <Route exact path="/" component={AddressBox} />
              <Route path="/admin" component={Teste} />
            </Switch>
            <Footer />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    state: state
  };
};

export default connect(mapStateToProps)(App);
