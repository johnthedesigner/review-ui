import React from 'react'

import Cart from '../../../common/components/Cart'
import reactor from '../../reactor'
import getters from '../../getters'
import actions from '../../actions/testActions'

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      products: getters.cartProducts,
      total: getters.cartTotal,
    }
  },

  onCheckoutClicked: function () {
    // we will implement this in the next section
  },

  render: function () {
    return (
      <Cart products={this.state.products.toJS()} total={this.state.total} onCheckoutClicked={this.onCheckoutClicked} />
    )
  },
})