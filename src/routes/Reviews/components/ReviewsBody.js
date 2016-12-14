//import React, { PropTypes } from 'react'
import React from 'react'
import ReviewList from './ReviewList'

const ReviewsBody = ({ reviews }) => (
  <ReviewList reviews={reviews} />
)

//ReviewList.propTypes = {
//  reviews: PropTypes.arrayOf(PropTypes.shape({
//    title: PropTypes.string.isRequired
//  }).isRequired).isRequired
//}

export default ReviewsBody