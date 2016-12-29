import React from 'react'
import { IndexLink, Link } from 'react-router'
import './Header.scss'

export const Header = () => (
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
  </div>
)

export default Header
