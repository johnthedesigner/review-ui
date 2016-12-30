import { connect } from 'react-redux'
import { createNewThing } from '../actions'

import CreateThingBody from '../components/CreateThingBody'

const mapDispatchToProps = (dispatch) => {
  return {
    clickAddThing: (thing, access_token) => {
      console.log(thing)
      dispatch(createNewThing(thing, access_token))
    }
  }
}

const mapStateToProps = (state) => ({
  isLoading: state.reviews.currentThing.isLoading,
  messages: state.messages,
  user: state.user
})

const CreateThingContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateThingBody)

export default CreateThingContainer
