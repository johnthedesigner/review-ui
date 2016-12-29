//import React, { PropTypes } from 'react'
import React from 'react'

import AddReview from './AddReview'

class CreateReviewBody extends React.Component {
  componentDidMount() {
    const { loadThing, params } = this.props
    loadThing(params.thingId)
  }

  render() {
    let thing = this.props.thing
    let clickAddReview = this.props.clickAddReview
    return (
      <div>
        <AddReview thing={thing} thingId={thing.id} clickAddReview={clickAddReview} />
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