import React, { PropTypes } from 'react'

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