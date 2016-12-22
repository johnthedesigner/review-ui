//import React, { PropTypes } from 'react'
import React from 'react'
import AddReview from './AddReview'

const CreateReviewBody = ({ clickAddReview }) => (
  <div>
    <AddReview clickAddReview={clickAddReview} />
  </div>
)

//ReviewList.propTypes = {
//  reviews: PropTypes.arrayOf(PropTypes.shape({
//    title: PropTypes.string.isRequired
//  }).isRequired).isRequired
//}

export default CreateReviewBody