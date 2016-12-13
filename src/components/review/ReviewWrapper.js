import React from 'react';
import RequestUtils from '../../utils/RequestUtils'

const ReviewWrapper = React.createClass({
  render() {
    let requests = this.props.requests
    
    // Check for pending requests
    let receiveReviewPending = RequestUtils.isPending(requests, 'RECEIVE_REVIEW')
    
    // Prep review feed
    let reviewPendingStatus = receiveReviewPending ? 'Pending' : 'OK'
    let reviewClassName = 'wrapper reviewWrapper'
    reviewClassName += ' reviewWrapper-' + reviewPendingStatus.toLowerCase()

    return (
      <div className={reviewClassName}>
        {this.props.children}
      </div>
    )
  }
})


export default ReviewWrapper