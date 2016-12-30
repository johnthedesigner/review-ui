import { connect } from 'react-redux'
import { fetchThings } from '../actions'

import ThingsBody from '../components/ThingsBody'

const mapDispatchToProps = (dispatch) => {
  return {
    loadThings: () => {
      dispatch(fetchThings())
    }
  }
}

const mapStateToProps = (state) => ({
  thingsList: state.reviews.thingsList,
  thingsById: state.reviews.thingsById,
  user: state.user
})

const ThingsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThingsBody)

export default ThingsContainer
