import { connect } from 'react-redux'
import { fetchLogIn } from '../actions'

import LoginBody from '../components/LoginBody'

const assembleUser = (state) => {
  let user = {}
  if ( state.user.id != null ) {
    user = state.user
  }
  return user
}

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: (credentials) => {
      dispatch(fetchLogIn(credentials))
    }
  }
}

const mapStateToProps = (state) => ({
  user: assembleUser(state)
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBody)

export default LoginContainer
