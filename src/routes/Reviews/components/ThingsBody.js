import React, { PropTypes } from 'react'
import ThingList from './ThingList'

class ThingsBody extends React.Component {
  mapThings(props) {
    return _.map(props.thingsList.items, function(thing) {
      return props.thingsById[thing]
    })
  }

  componentDidMount() {
    const { loadThings } = this.props
    loadThings()
  }

  render() {
    return (
      <div>
        <ThingList things={this.mapThings(this.props)} />
      </div>
    );
  }
}

export default ThingsBody