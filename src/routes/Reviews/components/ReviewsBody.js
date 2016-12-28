import React, { PropTypes } from 'react'
import ReviewList from './ReviewList'

import { consoleGroup } from '../../../utils/utils'

class ReviewsBody extends React.Component {
  // getDefaultProps() {
  //   reviewsById: {},
  //   thingsById: {},
  //   feed: {
  //     items: [],
  //     isLoading: false
  //   }
  // }
  mapReviews(props) {
    return _.map(props.feed.items, function(review) {
      return props.reviewsById[review]
    })
  }

  componentWillMount() {
    consoleGroup('XXXXXXX', [this.props])
  }

  componentDidMount() {
    const { loadReviews } = this.props
    loadReviews()
  }

  render() {
    return (
      <div>
        <ReviewList reviews={this.mapReviews(this.props)} />
      </div>
    );
  }
}

export default ReviewsBody