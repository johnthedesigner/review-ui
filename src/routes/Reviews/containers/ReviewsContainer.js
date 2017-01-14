import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchReviewList, likeReview } from '../actions'
import ReviewsBody from '../components/ReviewsBody'

// Denormalize reviews
const mapReviews = (feed = {}, reviews = {}, things = {}) => {
  return _.map(feed.items, function(id) {
    let assembledReview = reviews[id]
    assembledReview.thing = things[assembledReview.thingId]
    return assembledReview
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviews: () => {
      dispatch(fetchReviewList())
    },
    likeReview: (reviewId, reviewerId, access_token) => {
      dispatch(likeReview(reviewId, reviewerId, access_token))
    }
  }
}

const mapStateToProps = (state) => ({
  reviews: mapReviews(
    state.reviews.feed,
    state.reviews.reviewsById,
    state.things.thingsById
  ),
  auth: state.user.auth
})

const ReviewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewsBody)

export default ReviewsContainer
