import { connect } from 'react-redux'
import { fetchThingList } from '../actions'

import ThingsBody from '../components/ThingsBody'

const mapThings = (state) => {
  return _.map(state.things.thingsList.items, function(thing) {
    return state.things.thingsById[thing]
  })
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadThings: () => {
      dispatch(fetchThingList())
    }
  }
}

const mapStateToProps = (state) => ({
  thingsList: state.things.thingsList,
  thingsById: state.things.thingsById,
  user: state.user,
  reviews: state.reviews,
  things: mapThings(state)
})

const ThingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThingsBody)

export default ThingsContainer
