import React from 'react';
import RequestUtils from '../../utils/RequestUtils'
import LoginForm from './LoginForm'

const LoginWrapper = React.createClass({
  render() {
    let requests = this.props.requests

    return (
      <div className="wrapper">
        <LoginForm/>
      </div>
    )
  }
})


export default LoginWrapper