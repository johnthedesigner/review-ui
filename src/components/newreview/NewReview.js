import React from 'react'
import reactor from '../../reactor'
import getters from '../../getters'
import { toImmutable } from 'nuclear-js'
import ReviewActions from '../../actions/reviewActions'
import RequestUtils from '../../utils/RequestUtils'
import NewReviewWrapper from './NewReviewWrapper'

export default React.createClass({
  mixins: [reactor.ReactMixin,],
  
  getDataBindings() {
    return {
      requests: getters.requests
    }
  },
  
  render() {
    let requests = this.state.requests.toJS()

    return (
      <NewReviewWrapper requests={requests} />
    );
  }
});
