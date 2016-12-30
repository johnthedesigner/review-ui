import React, { PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'

import { noAuthRedirect } from '../../../utils/utils'
import ThingList from './ThingList'

class ThingsBody extends React.Component {
  mapThings(props) {
    return _.map(props.thingsList.items, function(thing) {
      return props.thingsById[thing]
    })
  }

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
        <ThingList things={this.mapThings(this.props)} />
      </div>
    );
  }
}

export default ThingsBody