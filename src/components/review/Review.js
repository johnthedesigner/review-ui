import React from 'react'
import reactor from '../../reactor'
import getters from '../../getters'
import { toImmutable } from 'nuclear-js'
import ReviewActions from '../../actions/reviewActions'
import RequestUtils from '../../utils/RequestUtils'
import ReviewWrapper from './ReviewWrapper'
import ReviewFull from './ReviewFull'

export default React.createClass({
  mixins: [reactor.ReactMixin],
  
  getDataBindings() {
    // Initial Data Fetch
    ReviewActions.fetchReview(this.props.params.id)
    
    return {
      reviews: getters.reviews,
      requests: getters.requests
    }
  },
  
  getInitialState() {
    return toImmutable({})
  },
  
  componentWillReceiveProps(newProps) {
    ReviewActions.fetchReview(newProps.params.id)
  },
  
  render() {
    let reviews = this.state.reviews.toJS().reviews
    let currentReview = this.state.reviews.toJS().current_review
    let requests = this.state.requests.toJS()
    let params = this.props.params
    
    // Wait for review data
    let ReviewObject = () => {if (reviews != undefined) {
      console.log(reviews[currentReview])
      return <ReviewFull params={params} review={reviews[currentReview]} requests={requests} />
    }}
    return (
      <ReviewWrapper requests={requests} >
        {ReviewObject()}
      </ReviewWrapper>
    );
  }
});
