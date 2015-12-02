import React from 'react';
import ReviewList from './ReviewList';
import ReviewActions from '../../actions/reviewActions';

export default React.createClass({
  componentWillMount() {
    ReviewActions.fetchReviews();
  },
  
  render() {
    return (
      <div className="review-list">
        <h2 className="review-title">My Feed</h2>
        <ReviewList/>
      </div>
    );
  }
});
