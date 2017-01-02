import React, { PropTypes } from 'react'

import { noAuthRedirect } from '../../../utils/utils'
import Thing from './Thing'
import ReviewList from './ReviewList'
import errorMessage from '../../../components/errorMessage'

class ThingBody extends React.Component {
  thingLoading() { // TODO: Make a real component for this
    return <h1 className="loading">Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... </h1>
  }

  checkLoadingState(props) {
    if (props.isLoading) {
      return this.thingLoading()
    } else if (this.props.thing.Error) {
      return <errorMessage message={this.props.thing.Error.message} />
    } else {
      return <Thing thing={this.props.thing} />
    }
  }

  componentWillReceiveProps(nextProps) {
    noAuthRedirect(nextProps)
  }

  componentDidMount() {
    const { loadThing, params } = this.props
    loadThing(params.id)
  }

  render() {
    if (this.props.thing) {
      return (
        <div>
          {this.checkLoadingState(this.props)}
          <p>Reviews for this thing:</p>
          <ReviewList reviews={this.props.thing.reviews} />
        </div>
      )
    } else {
      return null
    }
  }
}

ThingBody.propTypes = {
  thing: PropTypes.object,
  isLoading: PropTypes.bool
}

export default ThingBody
