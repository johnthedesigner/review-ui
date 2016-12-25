import React, { PropTypes } from 'react'

const Review = ({ review }) => (
  <article>
    <h3>{review.title}</h3>
    <h4>Rating: {review.rating}</h4>
    <p><em>{new Date(review.createdDate).toString()}</em></p>
    <p>{review.content}</p>
  </article>
)

Review.propTypes = {
  review: PropTypes.shape({
    createdDate: PropTypes.date,
    title: PropTypes.string,
    id: PropTypes.number,
    content: PropTypes.string,
    rating: PropTypes.number
  })
}

export default Review