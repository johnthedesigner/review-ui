import { connect } from 'react-redux'
import { fetchLogIn } from '../actions'
import { resetCurrentError, resetCurrentAlert } from '../../../store/messages'

import LoginBody from '../components/LoginBody'

const mapDispatchToProps = (dispatch) => {
  return {
    tryLogin: (credentials) => {
      dispatch(fetchLogIn(credentials))
    },
    triggerResetError: () => {
      dispatch(resetCurrentError())
    },
    triggerResetAlert: () => {
      dispatch(resetCurrentAlert())
    }
  }
}

const mapStateToProps = (state) => ({
  messages: state.messages,
  user: state.user
})

const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginBody)

export default LoginContainer
