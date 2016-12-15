import React, { PropTypes } from 'react'

const Review = ({ review }) => (
  <article>
    <h3>{review.title}</h3>
    <h4>Rating: {review.rating}</h4>
    <p>{review.text}</p>
  </article>
)

Review.propTypes = {
  review: PropTypes.shape({
    title: PropTypes.string,
    id: PropTypes.string,
    text: PropTypes.string,
    rating: PropTypes.number,
  })
}

export default Review