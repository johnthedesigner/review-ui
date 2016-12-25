import React, { PropTypes } from 'react'
import ReviewList from './ReviewList'

ReviewList.propTypes = {
 reviews: PropTypes.arrayOf(PropTypes.shape({
   title: PropTypes.string.isRequired
 }).isRequired).isRequired
}

class ReviewsBody extends React.Component {
  componentDidMount() {
    const { loadReviews } = this.props
    loadReviews()
  }

  render() {
    return (
      <div>
        <ReviewList reviews={this.props.reviews} />
      </div>
    );
  }
}

export default ReviewsBody