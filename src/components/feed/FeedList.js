import React from 'react'
import { toImmutable } from 'nuclear-js'
import FeedItem from './FeedItem'


const FeedList = React.createClass({
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
    return (
      <FeedList>
        {feed.reviews.map(review => {
          return <FeedItem key={review.get('_id')} review={review} loading={feed.loading} />
        }).toList()}
      </FeedList>
    )
  },
})