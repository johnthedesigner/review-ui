import React, { PropTypes } from 'react'

const Review = ({ title }) => (
  <li>
    {title}
  </li>
)

Review.propTypes = {
  title: PropTypes.string.isRequired
}

export default Review