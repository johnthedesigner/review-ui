import { connect } from 'react-redux'

import Header from './Header'
import { fetchLogOut } from '../../routes/User/actions'

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogOut: (user) => {
      dispatch(fetchLogOut(user))
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
})

const HeaderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)

export default HeaderContainer
