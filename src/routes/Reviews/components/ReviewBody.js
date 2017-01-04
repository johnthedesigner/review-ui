import React, { PropTypes } from 'react'
import { browserHistory } from 'react-router'

import { noAuthRedirect } from '../../../utils/utils'
import Review from './Review'

class ReviewBody extends React.Component {
  reviewLoading() { // TODO: Make a real component for this
    return <h1 className="loading">Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... </h1>
  }

  reviewError(error) { // TODO: Make a real component for this
    return <h1 className="loading">Error: {error.message}</h1>
  }

  checkLoadingState(props) {
    console.log(this.props)
    if (props.isLoading) {
      return this.reviewLoading()
    } else if (this.props.messages.currentError.message) {
      return this.reviewError(this.props.messages.currentError)
    } else if (this.props.review.id) {
      return <Review review={this.props.review} />
    }
  }

  componentWillReceiveProps(nextProps) {
    noAuthRedirect(nextProps)
  }

  componentDidMount() {
    const { loadReview, params } = this.props
    this.props.triggerResetError()
    this.props.triggerResetAlert()
    loadReview(params.id)
  }

  render() {
    return (
      <div>
        {this.checkLoadingState(this.props)}
      </div>
    )
  }
}

ReviewBody.propTypes = {
  review: PropTypes.object,
  isLoading: PropTypes.bool
}

export default ReviewBody