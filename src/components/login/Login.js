import React from 'react'
import reactor from '../../reactor'
import getters from '../../getters'
import { toImmutable } from 'nuclear-js'
import AuthActions from '../../actions/authActions'
import LoginWrapper from './LoginWrapper'

export default React.createClass({
  mixins: [reactor.ReactMixin,],
  
  getDataBindings() {
    return {
      requests: getters.requests
    }
  },
  
  render() {
    let requests = this.state.requests.toJS()

    return (
      <LoginWrapper requests={requests} />
    );
  }
});
