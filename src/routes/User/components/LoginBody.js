import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

let usernameInput, passwordInput

class LoginBody extends React.Component {
  componentWillReceiveProps(nextProps) {
    // Redirect to Reviews Page if logged in
    if (nextProps.user.isLoggedIn) browserHistory.push('/reviews')
  }

  componentDidMount() {
    this.props.triggerResetError()
    this.props.triggerResetAlert()
  }

  loginLoading() { // TODO: Make a real component for this
    return <h1 className="loading">Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... </h1>
  }

  submitLogIn = (e, props) => {
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

  checkForError(error) {
    if (error.message) {
      return <h1 className="loading">Error: {error.message}</h1>
    }
  }

  checkForAlert(alert) {
    if (alert.message) {
      return <h1 className="loading">Message: {alert.message}</h1>
    }
  }

  showButtonOrLoading(isLoading) {
    if (false) {
      return <button type="submit" disabled>Loading...</button>
    } else {
      return <button type="submit">Log In</button>
    }
  }

  render() {
    return (
      <div>
        {this.checkForAlert(this.props.messages.currentAlert)}
        {this.checkForError(this.props.messages.currentError)}
        <form onSubmit={(e) => { this.submitLogIn(e, this.props) }}>
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
          {this.showButtonOrLoading(this.props.user.isLoading)}
        </form>
      </div>
    )
  }
}

LoginBody.propTypes = {
  user: PropTypes.object
}

export default LoginBody