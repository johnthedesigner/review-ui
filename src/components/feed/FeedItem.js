import React from 'react'
import { Link } from 'react-router'
import RequestUtils from '../../utils/RequestUtils'
import ReviewActions from '../../actions/reviewActions';
import LikeButton from '../common/LikeButton'

// Material-UI
const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

const FeedItem = React.createClass({
  render() {
    let review = this.props.review
    let requests = this.props.requests
    
    // Check for pending requests
    let likeButtonPending = RequestUtils.isPending(requests, 'LIKE_BUTTON', review._id)
    let receiveReviewPending = RequestUtils.isPending(requests, 'RECEIVE_REVIEW', review._id)
    
    return (
      <Card className='card feedCard'>
        <CardHeader
          title={review.author.username}
          avatar='http://lorempixel.com/200/200/people/'/>
        <CardMedia overlay={<CardTitle title={review.reviewable.name} subtitle={review.reviewable.description}/>}>
          <img src='http://lorempixel.com/600/337/nature/'/>
        </CardMedia>
        <Link to={`/review/${review._id}`}>
          <CardTitle title={review.title} subtitle={review.rating}/>
        </Link>
        <CardText>
          <div>{review.body}</div>
        </CardText>
        <CardActions>
          <LikeButton review={this.props.review} requests={this.props.requests} isPending={likeButtonPending} /> 
        </CardActions>
      </Card>
    )
  }
})
FeedItem.propTypes = {
  review: React.PropTypes.shape({
    title: React.PropTypes.string,
    body: React.PropTypes.string,
    author: React.PropTypes.object,
    reviewable: React.PropTypes.object,
    rating: React.PropTypes.number,
    like: React.PropTypes.bool
  }).isRequired
};

export default FeedItem