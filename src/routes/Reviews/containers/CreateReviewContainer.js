import { connect } from 'react-redux'
import { createNewReview, fetchThing } from '../actions'

import CreateReviewBody from '../components/CreateReviewBody'

const assembleThing = (state) => {
  let thing = {}
  if ( state.reviews.currentThing.id != null ) {
    thing = state.reviews.thingsById[state.reviews.currentThing.id]
    thing.reviews = _.filter(state.reviews.reviewsById,{'thingId':thing.thingId})
  }
  return thing
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickAddReview: (review) => {
      dispatch(createNewReview(review))
    },
    loadThing: (id) => {
      dispatch(fetchThing(id))
    }

  }
}

const mapStateToProps = (state) => ({
  thing: assembleThing(state),
  isLoading: state.reviews.currentThing.isLoading,
  user: state.user
})

const CreateReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReviewBody)

export default CreateReviewContainer
