import React from 'react'
import reactor from '../../reactor'
import getters from '../../getters'
import { toImmutable } from 'nuclear-js'
import ReviewFull from './ReviewFull'
import ReviewActions from '../../actions/reviewActions'
import RequestTracker from '../../mixins/RequestTracker'
import {
    RECEIVE_REVIEW,
} from '../../constants/actionTypes'

const ReviewWrapper = React.createClass({
  render() {
    return (
      <div className="review-wrapper">{this.props.children}</div>
    )
  }
})

export default React.createClass({
  mixins: [reactor.ReactMixin],
  
  getDataBindings() {
    return {
      review: getters.review,
      requests: getters.requests
    }
  },
  
  getInitialState() {
    ReviewActions.fetchReview(this.props.params.id)
    return toImmutable({})
  },
  
  componentWillReceiveProps(newProps) {
    ReviewActions.fetchReview(newProps.params.id)
  },
  
  render() {
    let review_getter = this.state.review.toJS()
    let review = toImmutable({}).merge(toImmutable(this.state.review.toJS().reviews))
    let loading = toImmutable({}).merge(toImmutable(this.state.review.toJS().loading))
    return (
      <div className="review-list">
        <h2 className="review-title">Review</h2>
        <ReviewWrapper>
          {review.map(review => {
            return <ReviewFull key={review.get('_id')} review={review.toJS()} loading={loading} />
          }).toList()}
        </ReviewWrapper>
      </div>
    );
  }
});
