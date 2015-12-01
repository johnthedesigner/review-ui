import React from 'react'
import CartContainer from './CartContainer'
import ProductsContainer from './ProductsContainer'
import testActions from '../../actions/testActions'

export default React.createClass({
  componentWillMount() {
    testActions.fetchProducts();
  },
  
  render() {
    return (
      <div>
        <ProductsContainer />
        <CartContainer />
      </div>
    )
  }
})