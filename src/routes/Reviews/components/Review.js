import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import Thing from '../../Things/components/Thing'

class Review extends React.Component {
  shouldShowThing(review) {
    if (review.thing) {
      return <Thing thing={review.thing} />
    }
  }

  render() {
    let review = {}
    if (this.props.review != undefined) {review = this.props.review}
    return (
      <article className="reviewItem">
        {this.shouldShowThing(review)}
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
    id: PropTypes.string,
    content: PropTypes.string,
    rating: PropTypes.number
  })
}

export default Review