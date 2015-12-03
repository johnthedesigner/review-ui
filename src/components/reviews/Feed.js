import React from 'react';
import reactor from '../../reactor'
import getters from '../../getters'
import { toImmutable } from 'nuclear-js'
import ReviewActions from '../../actions/reviewActions';
import ReviewList from './ReviewList';
import ReviewItem from './ReviewItem';

const FeedWrapper = React.createClass({
  render() {
    return (
      <div className="feed-wrapper">
        {this.props.children}
      </div>
    )
  }
})

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      feed: getters.feed,
    }
  },

  getInitialState() {
    ReviewActions.fetchReviews()
    return toImmutable({})
  },
  
  componentDidUpdate() {
    ReviewActions.fetchReviews()
  },
  
  render() {
    let feed = this.state.feed
    let reviews = toImmutable({}).merge(toImmutable(this.state.feed.toJS().reviews))
    return (
      <div className="review-list">
        <h2 className="review-title">My Feed</h2>
        <FeedWrapper>
          {reviews.map(review => {
            return <ReviewItem key={review.get('_id')} review={review} loading={feed.loading} />
          }).toList()}
        </FeedWrapper>
      </div>
    );
  }
});
