import React from 'react'
import ReviewActions from '../../actions/reviewActions';

const LikeButton = React.createClass({
  likeButton(id) {
    console.log('likeButton clicked: ' + id)
    ReviewActions.likeButton(id)
  },
  
  render() {
    var review = this.props.review;
    var requests = this.props.requests;
    
    var like_button_state = []
    function init_like_button(props) {
      if(props.review.like){
        like_button_state.text = "Unlike";
      } else {
        like_button_state.text = "Like";
      }
    }
    init_like_button(this.props);
    like_button_state.className = "likeButton-" + like_button_state.text;
     
    return (
        <button className={like_button_state.className} onClick={() => this.likeButton(review._id)}>{like_button_state.text}</button>
    )
  }
})
LikeButton.propTypes = {
    review: React.PropTypes.shape({
      _id: React.PropTypes.number.isRequired,
      like: React.PropTypes.bool.isRequired
    }).isRequired
};

export default LikeButton