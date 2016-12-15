import React, { PropTypes } from 'react'
import Review from './Review'

const ReviewList = ({ reviews }) => (
  <ul>
    {reviews.map(review =>
      <Review
        key={review.id}
        review={review}
        {...review}
      />
    )}
  </ul>
)

ReviewList.propTypes = {
 reviews: PropTypes.array.isRequired
}

export default ReviewList