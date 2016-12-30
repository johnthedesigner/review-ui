import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

import ReviewList from './ReviewList'
import '../styles/reviewBody.scss'

class ReviewsBody extends React.Component {
  mapReviews(props) {
    return _.map(props.feed.items, function(id) {
      let assembledReview = props.reviewsById[id]
      assembledReview.thing = props.thingsById[assembledReview.thing]
      return assembledReview
    })
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    // Redirect to Reviews Page if logged in
    if (!nextProps.user.isLoggedIn) browserHistory.push('/login')
  }

  componentDidMount() {
    const { loadReviews } = this.props
    loadReviews()
  }

  render() {
    return (
      <div>
        <ReviewList reviews={this.mapReviews(this.props)} />
      </div>
    );
  }
}

export default ReviewsBody