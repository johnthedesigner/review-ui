import { connect } from 'react-redux'
import { fetchReview } from '../actions'

import ReviewBody from '../components/ReviewBody'

const assembleReview = (state) => {
  let review = {}
  if ( state.reviews.currentReview.id != null ) {
    review = state.reviews.reviewsById[state.reviews.currentReview.id]
    review.thing = state.reviews.thingsById[review.thingId]
  }
  return review
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReview: (reviewId) => {
      dispatch(fetchReview(reviewId))
    }
  }
}

const mapStateToProps = (state) => ({
  review: assembleReview(state),
  isLoading: state.reviews.currentReview.isLoading
})

const ReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewBody)

export default ReviewContainer
