//import React, { PropTypes } from 'react'
import React from 'react'
import { browserHistory } from 'react-router'

import AddReview from './AddReview'

class CreateReviewBody extends React.Component {
  componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    // Redirect to Reviews Page if logged in
    if (!nextProps.user.isLoggedIn) browserHistory.push('/login')
  }

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