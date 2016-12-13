import React from 'react'
import RequestUtils from '../../utils/RequestUtils'
import ReviewActions from '../../actions/reviewActions';
const RaisedButton = require('material-ui/lib/raised-button');
const FontIcon = require('material-ui/lib/font-icon');

const LikeButton = React.createClass({
  render() {
    // Collect props
    var review = this.props.review
    var requests = this.props.requests
    let isPending = this.props.isPending
    
    // Prep button
    let likeButtonState = review.like ? 'Unlike' : 'Like'
    let likeButtonPending = isPending ? 'pending' : 'ok'
    let likeButtonClassName = 'likeButton'
    likeButtonClassName += ' likeButton-' + likeButtonState.toLowerCase()
    likeButtonClassName += ' likeButton-' + likeButtonPending
     
    return (
      <RaisedButton 
        className={likeButtonClassName} 
        onClick={() => ReviewActions.likeButton(review._id)} 
        label={likeButtonState}
        labelPosition='after'
        primary={true}/>
    )
  }
})

LikeButton.propTypes = {
  review: React.PropTypes.shape({
    _id: React.PropTypes.number.isRequired,
    like: React.PropTypes.bool.isRequired
  }).isRequired
}

export default LikeButton