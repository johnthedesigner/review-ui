import React, { PropTypes } from 'react'

import { noAuthRedirect } from '../../../utils/utils'
import Thing from './Thing'
import ReviewList from '../../Reviews/components/ReviewList'
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

  showReviewsIfPresent(reviews, auth) {
    if (reviews) return <ReviewList reviews={reviews} auth={auth} />
  }

  componentWillReceiveProps(nextProps) {
    noAuthRedirect(nextProps)
  }

  componentDidMount() {
    const { loadThing, params } = this.props
    loadThing(params.id)
  }

  componentWillUnmount() {
    this.props.triggerResetError()
    this.props.triggerResetAlert()
  }

  render() {
    let { thing, user, isLoading } = this.props
    if (thing) {
      return (
        <div>
          {this.checkLoadingState(this.props)}
          <p>Reviews for this thing:</p>
          {this.showReviewsIfPresent(thing.reviews, user.auth, {} )}
        </div>
      )
    } else {
      return null
    }
  }
}

ThingBody.propTypes = {
  thing: PropTypes.object,
  user: PropTypes.object,
  isLoading: PropTypes.bool
}

export default ThingBody
