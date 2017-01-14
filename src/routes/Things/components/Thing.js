import React, { PropTypes } from 'react'
import { Link } from 'react-router'

import LikeButton from '../../Likes/components/LikeButton'
import { THING } from '../../Likes/constants'

class Thing extends React.Component {
  render() {
    let thing = {}
    if (this.props.thing) thing = this.props.thing
    return (
      <article className="thingItem">
        <h3><Link to={`/thing/${thing.id}`}>{thing.name}</Link></h3>
        <p>{thing.desc}</p>
        <Link to={`/reviews/create/${thing.id}`}><button>Review This</button></Link>
        <LikeButton type={THING} id={thing.id} />
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