import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

class Header extends React.Component {
  logInOrOut() {
    let user = this.props.user
    let isLoggedIn = user.isLoggedIn
    if (!isLoggedIn) {
      return (
        <span>
          <Link to='/login' activeClassName='route--active'>
            Log In
          </Link>
          {' · '}
          <Link to='/register' activeClassName='route--active'>
            Register
          </Link>
        </span>
      )
    } else {
      return (
        <a onClick={() => this.props.tryLogOut(this.props.user)}>
          Log Out
        </a>
      )
    }
  }

  render() {
    return (
      <div>
        <IndexLink to='/' activeClassName='route--active'>
          Home
        </IndexLink>
        {' · '}
        <Link to='/reviews' activeClassName='route--active'>
          Reviews
        </Link>
        {' · '}
        <Link to='/things' activeClassName='route--active'>
          Things
        </Link>
        {' · '}
        {this.logInOrOut(this.props)}
      </div>
    )
  }
}
export default Header
