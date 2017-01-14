import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

import { noAuthRedirect } from '../../../utils/utils'
import ReviewList from './ReviewList'
import '../styles/reviewBody.scss'

class ReviewsBody extends React.Component {
  componentWillReceiveProps(nextProps) {
    // noAuthRedirect(nextProps)
  }

  componentDidMount() {
    const { loadReviews } = this.props
    loadReviews()
  }

  render() {
    let { reviews, auth, likeReview } = this.props
    if (reviews) {
      return (
        <ReviewList reviews={reviews} auth={auth} likeReview={likeReview} />
      )
    } else {
      return null
    }
  }
}

export default ReviewsBody