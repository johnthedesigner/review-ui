import { connect } from 'react-redux'
import { fetchReviews } from '../actions'

import ReviewsBody from '../components/ReviewsBody'

const mapDispatchToProps = (dispatch) => {
  const review = {
    title: 'test',
    text: 'test',
    rating: 1,
    thingId: 0
  }
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
