import React, { PropTypes } from 'react'

class errorMessage extends React.Component {
  render() {
    return(
      <span className="errorMessage">{this.props.message}</span>
    )
  }
}

errorMessage.PropTypes = {
  message: PropTypes.string.isRequired
}