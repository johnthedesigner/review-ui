import React, { PropTypes } from 'react'

let usernameInput, passwordInput

class LoginBody extends React.Component {
  loginLoading() { // TODO: Make a real component for this
    return <h1 className="loading">Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... </h1>
  }

  loginError(error) { // TODO: Make a real component for this
    return <h1 className="loading">Error: {error.message}</h1>
  }

  submitLogin = (e, props) => {
    e.preventDefault()
    if (!usernameInput.value.trim()) {
      return
    }
    let credentials = {
      username: usernameInput.value,
      password: passwordInput.value
    }
    props.tryLogin(credentials)
    usernameInput.value = ''
    passwordInput.value = ''
  }

  checkLoadingState(props) {
    if (props.isLoading) {
      return this.loginLoading()
    } else if (this.props.user.Error) {
      return this.loginError(this.props.user.Error)
    }
  }

  render() {
    return (
      <div>
        {this.checkLoadingState(this.props)}
        <form onSubmit={(e) => { this.submitLogin(e, this.props) }}>
          <fieldset>
            <label>Username</label>
            <input ref={node => {
              usernameInput = node
            }} required />
          </fieldset>
          <fieldset>
            <label>Password</label>
            <input type="password" ref={node => {
              passwordInput = node
            }} required />
          </fieldset>
          <button type="submit">
            Add Review
          </button>
        </form>
      </div>
    )
  }
}

LoginBody.propTypes = {
  user: PropTypes.object
}

export default LoginBody