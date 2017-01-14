import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import _ from 'lodash'

import { REVIEW, THING } from '../constants'
import {
  likeReview,
  likeThing,
  unlikeReview,
  unlikeThing,
} from '../actions'

// Generic like button component
class LikeButtonBody extends React.Component {
  render() {
    let {
      type, // Prop set in JSX component
      id, // Prop set in JSX component
      likeReview,
      unlikeReview,
      likeThing,
      unlikeThing,
      reviewsById,
      thingsById,
      auth
    } = this.props

    // Based on "type" get the object and like/unlike functions
    let likeableObject, userLikeObject, likeFn, unlikeFn
    let likes = []
    switch (type) {
      case REVIEW:
        likeableObject = reviewsById[id]
        if (likeableObject && likeableObject.likes) likes = likeableObject.likes
        userLikeObject = _.find(likes, (like) => {
          return like.reviewerId === auth.userId
        })
        likeFn = () => likeReview(id, auth.userId, auth.id)
        unlikeFn = () => unlikeReview(id, userLikeObject.id, auth.id)
        break

      case THING:
        likeableObject = thingsById[id]
        if (likeableObject && likeableObject.likes) likes = likeableObject.likes
        userLikeObject = _.find(likes, (like) => {
          return like.reviewerId === auth.userId
        })
        likeFn = () => likeThing(id, auth.userId, auth.id)
        unlikeFn = () => unlikeThing(id, userLikeObject.id, auth.id)
        break

      default:
        break

    }

    if (!userLikeObject) {
      // Like Button
      return (
        <span className="likeButton">
          <button onClick={() => likeFn()}>
            Like
          </button>
          <span className="likeButton__text">
            &nbsp;{likes.length} people have liked this
          </span>
        </span>
      )
    } else {
      // Unlike Button
      return (
        <span className="likeButton">
          <button onClick={() => unlikeFn()}>
            Unlike
          </button>
          <span className="likeButton__text">
            &nbsp;You and {likes.length - 1} other people like this
          </span>
        </span>
      )
    }
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    likeReview: (reviewId, reviewerId, access_token) => {
      dispatch(likeReview(reviewId, reviewerId, access_token))
    },
    unlikeReview: (reviewId, likeId, access_token) => {
      dispatch(unlikeReview(reviewId, likeId, access_token))
    },
    likeThing: (thingId, reviewerId, access_token) => {
      dispatch(likeThing(thingId, reviewerId, access_token))
    },
    unlikeThing: (thingId, likeId, access_token) => {
      dispatch(unlikeThing(thingId, likeId, access_token))
    }
  }
}

const mapStateToProps = (state) => ({
  auth: state.user.auth,
  reviewsById: state.reviews.reviewsById,
  thingsById: state.things.thingsById
})

const LikeButton = connect(
  mapStateToProps,
  mapDispatchToProps
)(LikeButtonBody)

export default LikeButton
