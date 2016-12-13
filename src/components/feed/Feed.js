import React from 'react';
import reactor from '../../reactor'
import getters from '../../getters'
import { toImmutable } from 'nuclear-js'
import { RECEIVE_REVIEWS } from '../../constants/actionTypes'
import ReviewActions from '../../actions/reviewActions'
import FeedList from './FeedList'
import FeedItem from './FeedItem'
import FeedWrapper from './FeedWrapper'

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    // Initial Data Fetch
    ReviewActions.fetchReviews()

    return {
      reviews: getters.reviews,
      requests: getters.requests,
    }
  },

  getInitialState() {
    return toImmutable({})
  },
  
  render() {
    let requests = this.state.requests.toJS()
    let reviews = toImmutable({}).merge(toImmutable(this.state.reviews.toJS().reviews)) // TODO Simplify This Mess
    return (
      <div>
        <FeedWrapper requests={requests}>
          {reviews.map(review => {
            return <FeedItem key={review.get('_id')} review={review.toJS()} requests={requests} />
          }).toList()}
        </FeedWrapper>
      </div>
    );
  }
});
