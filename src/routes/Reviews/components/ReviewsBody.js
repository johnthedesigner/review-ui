import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

import { noAuthRedirect } from '../../../utils/utils'
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
    noAuthRedirect(nextProps)
  }

  componentDidMount() {
    const { loadReviews } = this.props
    loadReviews()
  }

  render() {
    if (this.props.feed.items) {
      return (
        <ReviewList reviews={this.mapReviews(this.props)} />
      )
    } else {
      return null
    }
  }
}

export default ReviewsBody