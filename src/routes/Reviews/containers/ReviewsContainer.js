import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchReviews } from '../actions'
import ReviewsBody from '../components/ReviewsBody'

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviews: () => {
      dispatch(fetchReviews())
    }
  }
}

const mapStateToProps = (state) => ({
  reviewsById: state.reviews.reviewsById,
  feed: state.reviews.feed,
  thingsById: state.reviews.thingsById
})

const ReviewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewsBody)

export default ReviewsContainer
