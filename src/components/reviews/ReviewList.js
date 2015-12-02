import React from 'react'
import reactor from '../../reactor'
import getters from '../../getters'
import actions from '../../actions/reviewActions'
import ReviewItem from './ReviewItem'


const ReviewList = React.createClass({
  render() {
    return (
      <div className="review-list">{this.props.children}</div>
    )
  }
})

export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      reviews: getters.feed,
    }
  },

  render: function () {
   return (
      <ReviewList title="All Reviews">
        {this.state.reviews.map(review => {
          return <ReviewItem key={review.get('_id')} review={review.toJS()} />
        }).toList()}
      </ReviewList>
    )
  },
})