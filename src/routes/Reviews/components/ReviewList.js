import React, { PropTypes } from 'react'
import Review from './Review'

const ReviewList = ({ reviews }) => (
  <div id="reviewList">
    {reviews.map(review =>
      <Review
        key={review.id}
        review={review}
        {...review}
      />
    )}
  </div>
)

ReviewList.propTypes = {
 reviews: PropTypes.array.isRequired
}

export default ReviewList