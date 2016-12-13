import React from 'react';
import RequestUtils from '../../utils/RequestUtils'
import ReviewForm from './ReviewForm'

const NewReviewWrapper = React.createClass({
  render() {
    let requests = this.props.requests

    return (
      <div className="wrapper">
        <ReviewForm/>
      </div>
    )
  }
})


export default NewReviewWrapper