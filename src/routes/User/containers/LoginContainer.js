import { connect } from 'react-redux'
import { fetchLogIn } from '../actions'

import LoginBody from '../components/LoginBody'

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: (credentials) => {
      dispatch(fetchLogIn(credentials))
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBody)

export default LoginContainer
