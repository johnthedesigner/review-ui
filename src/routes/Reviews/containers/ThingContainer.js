import { connect } from 'react-redux'
import { fetchThing } from '../actions'

import ThingBody from '../components/ThingBody'

const assembleThing = (state) => {
  // Get Thing from normalized state
  let currentThing = state.reviews.currentThing
  let thing = state.reviews.thingsById[currentThing.id]
  // Get Reviews for Thing from normalized state
  if (thing) {
    thing.reviews = _.filter(state.reviews.reviewsById,{'thingId':thing.id})
  }
  return thing
}

const mapDispatchToProps = (dispatch) => {
  return {
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

const ThingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThingBody)

export default ThingContainer
