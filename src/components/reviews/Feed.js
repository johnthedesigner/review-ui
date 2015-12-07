import React from 'react';
import reactor from '../../reactor'
import getters from '../../getters'
import { toImmutable } from 'nuclear-js'
import ReviewActions from '../../actions/reviewActions'
import { RECEIVE_REVIEWS } from '../../constants/actionTypes'
import ReviewList from './ReviewList'
import ReviewItem from './ReviewItem'

const FeedWrapper = React.createClass({
  render() {
    let pending = function(){
      if (this.props.loading.receive_reviews === pending) {
        console.log('Loading')
        return ' <b>Loading...</b>'
      } else {
        console.log('Done')
        return
      }
    }
    return (
      <div className="review-list">
        <h2 className="review-title">My Feed{pending}</h2>
        <div className="feed-wrapper">
          {this.props.children}
        </div>
      </div>
    )
  }
})

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      feed: getters.feed,
      requests: getters.requests
    }
  },

  getInitialState() {
    ReviewActions.fetchReviews()
    return toImmutable({})
  },
  
  render() {
    let feed = this.state.feed.toJS()
    let reviews = toImmutable({}).merge(toImmutable(this.state.feed.toJS().reviews))
    return (
      <FeedWrapper feed={feed}>
        {reviews.map(review => {
          return <ReviewItem key={review.get('_id')} review={review} loading={feed.loading} />
        }).toList()}
      </FeedWrapper>
    );
  }
});
