import React from "react";
import { connect } from 'react-redux'
import ProductBox from "../ProductBox/ProductBox";
import * as actions from "../../actions";

import "./styles.scss";

// function filterProducts(products, searchTerm) {
//   const filteredProducts = _.filter(products, product => {
//     const lowerName = product.name.toLowerCase();
//     if (lowerName.indexOf(searchTerm) !== -1) return product;
//     else return false;
//   });
//
//   return filteredProducts;
// }

class ProductGrid extends React.Component {
  render() {
    const { products, cart } = this.props.current;

    // const searchTerm = "";
    // const filteredProducts = filterProducts(products, searchTerm);

    return (
      <div className="products-content">
        <div className="products-header-tools">
          {/* <div className="header-tools-wraper">
            <input type="text"/>
          </div> */}
        </div>
        <section className="products-grid">
          {products.map((product, index) => (
            <ProductBox
              key={index}
              {...product}
              cart={cart}
              onClickButton={(id, operation) =>
                this.props.changeProductQuantity(id, operation)
              }
            />
          ))}
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { current: state.current };
}

ProductGrid.defaultProps = {
  isLoading: true
};

export default connect(mapStateToProps, actions)(ProductGrid);
