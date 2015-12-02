import React from 'react'

const ReviewItem = React.createClass({
  render() {
    var review = this.props.review;
    
    var like_button = []
    function init_like_button(props) {
      if(props.review.like){
        like_button.action = "Unlike";
      } else {
        like_button.action = "Like";
      }
    }
    init_like_button(this.props);
    like_button.className = "likeButton-" + this.action;
     
    return (
      <div className="card">
        <img className="reviewable-thumb" src="http://placehold.it/80x80" />
        <h2>ID: {review._id}</h2>
        <h4>{review.reviewable.name}</h4>
        <p>{review.reviewable.description}</p>
        <hr/>
        <img className="reviewer-thumb" src="http://placehold.it/80x80" />
        <p>@{review.author.username}</p>
        <h4>{review.title}</h4>
        <h2>{review.rating}</h2>
        <p>{review.body}</p>
        <button className={like_button.className}>{like_button.action}</button>
      </div>
    )
  }
})
ReviewItem.propTypes = {
    review: React.PropTypes.shape({
      _id: React.PropTypes.number.isRequired,
      title: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired,
      author: React.PropTypes.object.isRequired,
      reviewable: React.PropTypes.object.isRequired,
      rating: React.PropTypes.number.isRequired,
      like: React.PropTypes.bool.isRequired
    }).isRequired
};

export default ReviewItem