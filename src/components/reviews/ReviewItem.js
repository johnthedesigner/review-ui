import React from 'react'

const ReviewItem = React.createClass({
  render() {
    var review = this.props.review;

    return (
      <div className="card">
        <h4>{review.title}</h4>
        <p>{review.body}</p>
        <hr/>
      </div>
    )
  }
})
ReviewItem.propTypes = {
    review: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired
    }).isRequired
};

export default ReviewItem