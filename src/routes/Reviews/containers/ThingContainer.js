import { connect } from 'react-redux'
import { fetchThing } from '../actions'

import ThingBody from '../components/ThingBody'

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
