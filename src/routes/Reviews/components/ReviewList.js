import React, { PropTypes } from 'react'
import Review from './Review'

const ReviewList = ({ reviews }) => (
  <ul>
    {reviews.map(review =>
      <Review
        key={review.id}
        title={review.title}
        {...review}
      />
    )}
  </ul>
)

ReviewList.propTypes = {
 reviews: PropTypes.arrayOf(PropTypes.shape({
   title: PropTypes.string.isRequired
 }).isRequired).isRequired
}

export default ReviewList