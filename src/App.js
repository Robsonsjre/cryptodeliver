import React, { Component } from "react";
import MainframeSDK from "@mainframe/sdk";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import getWeb3 from "./components/utils/getWeb3";

import "./App.css";

import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import AddressBox from "./components/AddressBox/AddressBox";
import ProductGrid from "./components/ProductGrid/ProductGrid";

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
            <Header {...this.props.current} />
            <Switch>
              <div className="content-container">
                <Route exact path="/" component={AddressBox} />
                <Route path="/products" component={ProductGrid} />
                <Route path="/admin" component={Teste} />
              </div>
            </Switch>
            <Footer {...this.props.current} />
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    current: state.current
  };
};

export default connect(mapStateToProps)(App);
