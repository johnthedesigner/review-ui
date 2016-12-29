import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import Thing from './Thing'

class Review extends React.Component {
  render() {
    let review = {}
    if (this.props.review != undefined) {review = this.props.review}
    return (
      <article className="reviewItem">
        <Thing thing={review.thing} />
        <h3><Link to={`/review/${review.id}`}>{review.title}</Link></h3>
        <h4>Rating: {review.rating}</h4>
        <p><em>{new Date(review.createdDate).toString()}</em></p>
        <p>{review.content}</p>
      </article>
    )
  }
}

Review.propTypes = {
  review: PropTypes.shape({
    createdDate: PropTypes.date,
    title: PropTypes.string.isRequired,
    id: PropTypes.number,
    content: PropTypes.string,
    rating: PropTypes.number
  })
}

export default Review