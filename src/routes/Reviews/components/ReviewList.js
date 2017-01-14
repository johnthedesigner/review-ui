import React, { PropTypes } from 'react'
import Review from './Review'

const ReviewList = ({ reviews, auth, likeReview }) => (
  <div id="reviewList">
    {reviews.map(review =>
      <Review
        key={review.id}
        review={review}
        auth={auth}
        likeReview={likeReview}
      />
    )}
  </div>
)

ReviewList.propTypes = {
 reviews: PropTypes.array.isRequired
}

export default ReviewList