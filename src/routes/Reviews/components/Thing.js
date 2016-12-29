
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class Thing extends React.Component {
  render() {
    let thing = {}
    if (this.props.thing != undefined) {thing = this.props.thing}
    return (
      <article>
        <h3><Link to={`/thing/${thing.id}`}>{thing.name}</Link></h3>
        <p>{thing.desc}</p>
      </article>
    )
  }
}

Thing.propTypes = {
  thing: PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.number,
    desc: PropTypes.string
  })
}

export default Thing