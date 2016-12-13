import React from 'react'
import { Link } from 'react-router'
import ReviewActions from '../../actions/reviewActions';

const ReviewItem = React.createClass({
  likeButton(id) {
    console.log('likeButton clicked: ' + id)
    ReviewActions.likeButton(id)
  },
  
  render() {
    var review = this.props.review.toJS();
    
    // Initialize Like Button
    var like_button = []
    function init_like_button(like_status) {
      if(like_status){
        like_button.action = "Unlike";
      } else {
        like_button.action = "Like";
      }
    }
    init_like_button(review.like);
    like_button.class_name = "likeButton-" + like_button.action;
    
    return (
      <div className="card">
        <img className="reviewable-thumb" src="http://placehold.it/80x80" />
        <h4>{review.reviewable.name}</h4>
        <p>{review.reviewable.description}</p>
        <hr/>
        <img className="reviewer-thumb" src="http://placehold.it/80x80" />
        <p>@{review.author.username}</p>
        <h4><Link to={`/review/${review._id}`}>{review.title}</Link></h4>
        <h2>{review.rating}</h2>
        <p>{review.body}</p>
        <button className={like_button.class_name} onClick={() => this.likeButton(review._id)}>{like_button.action}</button>
      </div>
    )
  }
})
ReviewItem.propTypes = {
    review: React.PropTypes.shape({
      title: React.PropTypes.string,
      body: React.PropTypes.string,
      author: React.PropTypes.object,
      reviewable: React.PropTypes.object,
      rating: React.PropTypes.number,
      like: React.PropTypes.bool
    }).isRequired
};

export default ReviewItem