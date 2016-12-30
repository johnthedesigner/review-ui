//import React, { PropTypes } from 'react'
import React from 'react'
import { browserHistory } from 'react-router'

let nameInput, descInput

class CreateThingBody extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    // Redirect to Reviews Page if logged in
    if (!nextProps.user.isLoggedIn) browserHistory.push('/login')
  }

  submitAddThing(e, props) {
    e.preventDefault()
    if (!nameInput.value.trim()) {
      return
    }
    let access_token = this.props.user.auth.id
    let thing = {
      name: nameInput.value,
      desc: descInput.value,
      status: 'active'
    }
    props.clickAddThing(thing, access_token)
    nameInput.value = ''
    descInput.value = ''
  }

  checkForMessages(messages) {
    if (messages.currentError.message) {
      return <h1 className="loading">Error: {messages.currentError.message}</h1>
    }
    if (messages.currentAlert.message) {
      return <h1 className="loading">Message: {messages.currentAlert.message}</h1>
    }
  }

  render() {
    let thing = this.props.thing
    return (
      <div>
        {this.checkForMessages(this.props.messages)}
        <form onSubmit={(e) => { this.submitAddThing(e, this.props) }}>
          <fieldset>
            <label>Name</label>
            <input ref={node => {
              nameInput = node
            }} required />
          </fieldset>
          <fieldset>
            <label>Description</label>
            <input ref={node => {
              descInput = node
            }} required />
          </fieldset>
          <button type="submit">
            Add Review
          </button>
        </form>
      </div>
    )
  }
}

//ReviewList.propTypes = {
//  reviews: PropTypes.arrayOf(PropTypes.shape({
//    title: PropTypes.string.isRequired
//  }).isRequired).isRequired
//}

export default CreateThingBody