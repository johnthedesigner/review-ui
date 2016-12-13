import React from 'react'
import RequestUtils from '../../utils/RequestUtils'
import LikeButton from '../common/LikeButton'

// Material-UI
const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardExpandable = require('material-ui/lib/card/card-expandable');
const CardHeader = require('material-ui/lib/card/card-header');
const CardMedia = require('material-ui/lib/card/card-media');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

const ReviewFull = React.createClass({
  render() {
    let review = this.props.review
    let requests = this.props.requests
    let params = this.props.params
    
    // Check for pending requests
    let likeButtonPending = RequestUtils.isPending(requests, 'LIKE_BUTTON', params.id)
    let receiveReviewPending = RequestUtils.isPending(requests, 'RECEIVE_REVIEW', params.id)
    
    // Prep review card
    let reviewPendingStatus = receiveReviewPending ? 'pending' : 'ok'
    let reviewClassName = 'card reviewCard'
    reviewClassName += ' reviewCard-' + reviewPendingStatus

    return (
      <Card className={reviewClassName}>
        <CardHeader
          title={review.author.username}
          avatar='http://lorempixel.com/200/200/people/'/>
        <CardMedia overlay={<CardTitle title={review.reviewable.name} subtitle={review.reviewable.description}/>}>
          <img src='http://lorempixel.com/600/337/nature/'/>
        </CardMedia>
        <CardTitle title={review.title} subtitle={review.rating}/>
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

ReviewFull.defaultProps = {
  review: {
    _id: 0,
    title: '',
    body: '',
    rating: 0,
    like: false,
    author: {
      username: ''
    },
    reviewable: {
      name: '',
      description: ''
    },
  }
}

ReviewFull.propTypes = {
  review: React.PropTypes.shape({
    _id: React.PropTypes.number.isRequired,
    title: React.PropTypes.string.isRequired,
    body: React.PropTypes.string.isRequired,
    rating: React.PropTypes.number.isRequired,
    like: React.PropTypes.bool.isRequired,
    reviewable: React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      description: React.PropTypes.string.isRequired
    }),
    author: React.PropTypes.shape({
      username: React.PropTypes.string.isRequired
    })
  })
}

export default ReviewFull