import React, { PropTypes } from 'react'
import Review from './Review'

class ReviewBody extends React.Component {
  reviewLoading() { // TODO: Make a real component for this
    return <h1 className="loading">Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... </h1>
  }

  reviewError(error) { // TODO: Make a real component for this
    return <h1 className="loading">Error: {error.message}</h1>
  }

  loadingState(props) {
    if (props.currentReview != undefined && props.currentReview.isLoading) {
      return this.reviewLoading()
    } else if (props.currentReview === undefined) {
      return this.reviewLoading()
    } else if (props.currentReview.isLoading) {
      return this.reviewLoading()
    } else if (this.props.reviewsById[this.props.params.reviewId].error != undefined) {
      return this.reviewError(this.props.reviewsById[this.props.params.reviewId].error)
    } else {
      return <Review review={this.props.reviewsById[this.props.params.reviewId]} />
    }
  }
  componentDidMount() {
    const { loadReview, params, reviewsById } = this.props
    loadReview(params.reviewId)
  }

  render() {
    return (
      <div>
        {this.loadingState(this.props)}
      </div>
    )
  }
}

export default ReviewBody