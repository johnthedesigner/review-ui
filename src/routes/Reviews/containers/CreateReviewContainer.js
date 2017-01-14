import { connect } from 'react-redux'
import { createNewReview } from '../actions'
import { fetchCurrentThing } from '../../Things/actions'

import CreateReviewBody from '../components/CreateReviewBody'

const assembleThing = (state) => {
  // Get Thing from normalized state
  if (state.things.currentThing.id) {
    let thing = state.things.thingsById[state.things.currentThing.id]
    // Get Reviews for Thing from normalized state
    thing.reviews = _.filter(state.reviews.reviewsById,{'thingId':thing.id})
    return thing
  }
  return {}
}

const mapDispatchToProps = (dispatch) => {
  return {
    clickAddReview: (review, access_token) => {
      dispatch(createNewReview(review, access_token))
    },
    loadThing: (id) => {
      dispatch(fetchCurrentThing(id))
    }

  }
}

const mapStateToProps = (state) => ({
  thing: assembleThing(state),
  isLoading: state.things.currentThing.isLoading,
  user: state.user
})

const CreateReviewContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateReviewBody)

export default CreateReviewContainer
