import { connect } from 'react-redux'
import { fetchNewUser } from '../actions'
import { resetCurrentError, resetCurrentAlert } from '../../../store/messages'

import RegisterBody from '../components/RegisterBody'

const mapDispatchToProps = (dispatch) => {
  return {
    tryNewUser: (credentials) => {
      dispatch(fetchNewUser(credentials))
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

const RegisterContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterBody)

export default RegisterContainer
