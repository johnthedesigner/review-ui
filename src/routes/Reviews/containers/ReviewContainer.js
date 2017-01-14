import { connect } from 'react-redux'
import { fetchCurrentReview, likeReview } from '../actions'
import { resetCurrentError, resetCurrentAlert } from '../../../store/messages'

import ReviewBody from '../components/ReviewBody'

// Denormalize reviews
const mapReview = (currentReview = {}, reviews = {}, things = {}) => {
  let assembledReview = {}
  if (reviews[currentReview.id]) {
    assembledReview = reviews[currentReview.id]
    assembledReview.thing = things[assembledReview.thingId]
  }
  return assembledReview
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadReview: (id) => {
      dispatch(fetchCurrentReview(id))
    },
    triggerResetError: () => {
      dispatch(resetCurrentError())
    },
    triggerResetAlert: () => {
      dispatch(resetCurrentAlert())
    },
    likeReview: (reviewId, reviewerId, access_token) => {
      dispatch(likeReview(reviewId, reviewerId, access_token))
    }
  }
}

const mapStateToProps = (state) => ({
  review: mapReview(
    state.reviews.currentReview,
    state.reviews.reviewsById,
    state.things.thingsById
  ),
  isLoading: state.reviews.currentReview.isLoading,
  messages: state.messages,
  user: state.user
})

const ReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewBody)

export default ReviewContainer
