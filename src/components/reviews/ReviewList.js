import React from 'react'

import reactor from '../../reactor'
import getters from '../../getters'
import actions from '../../actions/reviewActions'


const ReviewList = React.createClass({
  render() {
    return (
      <div className="review-list">{this.props.children}</div>
    )
  }
})

const ReviewItem = React.createClass({
  render() {
    var review = this.props.review;

    return (
      <div className="card">
        <h4>{review.title}</h4>
        <p>{review.body}</p>
        <hr/>
      </div>
    )
  }
})
ReviewItem.propTypes = {
    review: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      body: React.PropTypes.string.isRequired
    }).isRequired
};


export default React.createClass({
  mixins: [reactor.ReactMixin],

  getDataBindings() {
    return {
      reviews: getters.reviews,
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