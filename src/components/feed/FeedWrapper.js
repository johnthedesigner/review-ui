import React from 'react';
import RequestUtils from '../../utils/RequestUtils'

export default React.createClass({
  render() {
    let requests = this.props.requests

    // Check for pending requests
    let receiveReviewsPending = RequestUtils.isPending(requests, 'RECEIVE_REVIEWS')
    
    // Prep review feed
    let feedPendingStatus = receiveReviewsPending ? 'Pending' : 'OK'
    let feedClassName = 'wrapper feedWrapper'
    feedClassName += ' feedWrapper-' + feedPendingStatus.toLowerCase()

    return (
      <div className={feedClassName}>
        <h2 className="feed-title">List {feedPendingStatus}</h2>
        <div className="feed-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
})