//import React, { PropTypes } from 'react'
import React from 'react'
import { browserHistory } from 'react-router'

import { noAuthRedirect } from '../../../utils/utils'
import AddReview from './AddReview'

class CreateReviewBody extends React.Component {
  componentWillReceiveProps(nextProps) {
    noAuthRedirect(nextProps)
  }

  componentDidMount() {
    const { loadThing, params } = this.props
    loadThing(params.thingId)
  }

  render() {
    let thing = this.props.thing
    let clickAddReview = this.props.clickAddReview
    let user = this.props.user
    return (
      <div>
        <AddReview user={user} thing={thing} thingId={thing.id} clickAddReview={clickAddReview} />
      </div>
    )
  }
}

//ReviewList.propTypes = {
//  reviews: PropTypes.arrayOf(PropTypes.shape({
//    title: PropTypes.string.isRequired
//  }).isRequired).isRequired
//}

export default CreateReviewBody