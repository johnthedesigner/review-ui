import { connect } from 'react-redux'
import { fetchCurrentReview } from '../actions'
import { resetCurrentError, resetCurrentAlert } from '../../../store/messages'

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
    loadReview: (id) => {
      dispatch(fetchCurrentReview(id))
    },
    triggerResetError: () => {
      dispatch(resetCurrentError())
    },
    triggerResetAlert: () => {
      dispatch(resetCurrentAlert())
    }
  }
}

const mapStateToProps = (state) => ({
  review: assembleReview(state),
  isLoading: state.reviews.currentReview.isLoading,
  messages: state.messages,
  user: state.user
})

const ReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ReviewBody)

export default ReviewContainer
