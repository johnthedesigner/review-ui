import { connect } from 'react-redux'
import _ from 'lodash'

import { fetchReviewList } from '../actions'
import ReviewsBody from '../components/ReviewsBody'

const mapDispatchToProps = (dispatch) => {
  return {
    loadReviews: () => {
      dispatch(fetchReviewList())
    }
  }
}

const mapStateToProps = (state) => ({
  reviewsById: state.reviews.reviewsById,
  feed: state.reviews.feed,
  thingsById: state.things.thingsById,
  user: state.user
})

const ReviewsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewsBody)

export default ReviewsContainer
