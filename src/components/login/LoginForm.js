import React from 'react'
import Formsy from 'formsy-react'
import {
  TestTextInput,
  TestPasswordInput,
  TestRatingInput,
  TestWysiwygInput
} from '../forms/TestInput'
import authActions from '../../actions/authActions'

const LoginForm = React.createClass({
  getInitialState() {
    return {
      canSubmit: false
    }
  },
  enableButton() {
    this.setState({
      canSubmit: true
    })
  },
  disableButton() {
    this.setState({
      canSubmit: false
    })
  },
  submit(model) {
    //someDep.saveEmail(model.email)
    //console.log(model)
    authActions.login(model.username, model.password)
  },
  render() {
    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <TestTextInput name="username" label="Username" required/>
        <TestPasswordInput name="password" required/>
        <button type="submit" name="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Formsy.Form>
    )
  }
})

export default LoginForm