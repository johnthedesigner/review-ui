import React from 'react';
import reactor from '../../reactor'
import getters from '../../getters'
import ReviewFull from './ReviewFull';
import ReviewActions from '../../actions/reviewActions';

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
    }
  },
  
  getInitialState() {
    ReviewActions.fetchReview(this.props.params.id)
    return {}
  },
  
  componentDidUpdate() {
    ReviewActions.fetchReview(this.props.params.id)
  },
  
  render() {
    return (
      <div className="review-list">
        <h2 className="review-title">Review</h2>
        <ReviewWrapper>
          {this.state.review.map(review => {
            return <ReviewFull key={review.get('_id')} review={review.toJS()} />
          }).toList()}
        </ReviewWrapper>
      </div>
    );
  }
});
