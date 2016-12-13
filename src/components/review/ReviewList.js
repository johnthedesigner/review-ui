import React from 'react'
import { toImmutable } from 'nuclear-js'
import actions from '../../actions/reviewActions'
import ReviewItem from './ReviewItem'


const ReviewList = React.createClass({
  render() {
    return (
      <div className="review-list">
        {this.props.children}
      </div>
    )
  }
})

export default React.createClass({
  render() {
    let feed = this.props.feed
    console.log(feed)
    return (
      <ReviewList title="All Reviews">
        {feed.reviews.map(review => {
          return <ReviewItem key={review.get('_id')} review={review} loading={feed.loading} />
        }).toList()}
      </ReviewList>
    )
  },
})