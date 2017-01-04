
import React, { PropTypes } from 'react'
import { Link } from 'react-router'

class Thing extends React.Component {
  render() {
    let thing = {}
    if (this.props.thing) thing = this.props.thing
    return (
      <article className="thingItem">
        <h3><Link to={`/thing/${thing.id}`}>{thing.name}</Link></h3>
        <p>{thing.desc}</p>
        <Link to={`/reviews/create/${thing.id}`}><button>Review This</button></Link>
      </article>
    )
  }
}

Thing.propTypes = {
  thing: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    desc: PropTypes.string
  })
}

export default Thing