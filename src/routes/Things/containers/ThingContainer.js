import { connect } from 'react-redux'
import { fetchCurrentThing } from '../actions'
import { resetCurrentError, resetCurrentAlert } from '../../../store/messages'

import ThingBody from '../components/ThingBody'

// Denormalize reviews
const mapThing = (currentThing = {}, things = {}, reviews = {}) => {
  let assembledThing = {}
  if (things[currentThing.id]) {
    assembledThing = things[currentThing.id]
  }
  return assembledThing
}

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
    loadThing: (id) => {
      dispatch(fetchCurrentThing(id))
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
  thing: assembleThing(state),
  isLoading: state.things.currentThing.isLoading,
  messages: state.messages,
  user: state.user
})

const ThingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThingBody)

export default ThingContainer
