import React from 'react'
import Formsy from 'formsy-react'
import {
  TestTextInput,
  TestRatingInput,
  TestWysiwygInput
} from '../forms/TestInput'

const ReviewForm = React.createClass({
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
    console.log(model)
  },
  render() {
    return (
      <Formsy.Form onValidSubmit={this.submit} onValid={this.enableButton} onInvalid={this.disableButton}>
        <TestTextInput name="email" validations="isEmail" validationError="This is not a valid email" required/>
        <TestRatingInput name="rating" defaultValue={this.state[0]}/>
        <TestWysiwygInput name="body" value={this.state.value}/>
        <button type="submit" name="submit" disabled={!this.state.canSubmit}>Submit</button>
      </Formsy.Form>
    )
  }
})

export default ReviewForm