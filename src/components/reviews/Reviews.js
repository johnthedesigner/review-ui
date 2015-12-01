import React from 'react';
import ReviewList from './ReviewList';
import ReviewActions from '../../actions/reviewActions';

export default React.createClass({
  componentWillMount() {
    ReviewActions.fetchReviews();
  },
  
  render() {
    return (
      <div>
        <h2>Reviews</h2>
        <ReviewList/>
      </div>
    );
  }
});
