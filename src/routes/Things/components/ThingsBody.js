import React, { PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'

import { noAuthRedirect } from '../../../utils/utils'
import ThingList from './ThingList'

class ThingsBody extends React.Component {
  componentWillReceiveProps(nextProps) {
    noAuthRedirect(nextProps)
  }

  componentDidMount() {
    const { loadThings } = this.props
    loadThings()
  }

  render() {
    return (
      <div>
        <Link to={'/things/create'}><button>New Thing</button></Link>
        <ThingList things={this.props.things} />
      </div>
    );
  }
}

export default ThingsBody