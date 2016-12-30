import React, { PropTypes } from 'react'
import { browserHistory, Link } from 'react-router'

import ThingList from './ThingList'

class ThingsBody extends React.Component {
  mapThings(props) {
    return _.map(props.thingsList.items, function(thing) {
      return props.thingsById[thing]
    })
  }

  componentWillReceiveProps(nextProps) {
    // Redirect to Reviews Page if logged in
    if (!nextProps.user.isLoggedIn) browserHistory.push('/login')
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