import React, { PropTypes } from 'react'
import Thing from './Thing'

class ThingBody extends React.Component {
  thingLoading() { // TODO: Make a real component for this
    return <h1 className="loading">Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... Loading... </h1>
  }

  thingError(error) { // TODO: Make a real component for this
    return <h1 className="loading">Error: {error.message}</h1>
  }

  checkLoadingState(props) {
    if (props.isLoading) {
      return this.thingLoading()
    } else if (this.props.thing.Error) {
      return this.thingError(this.props.thing.Error)
    } else {
      return <Thing thing={this.props.thing} />
    }
  }

  componentDidMount() {
    const { loadThing, params } = this.props
    loadThing(params.id)
  }

  render() {
    return (
      <div>
        {this.checkLoadingState(this.props)}
      </div>
    )
  }
}

ThingBody.propTypes = {
  thing: PropTypes.object,
  isLoading: PropTypes.bool
}

export default ThingBody
