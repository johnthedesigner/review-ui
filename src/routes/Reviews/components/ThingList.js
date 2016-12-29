import React, { PropTypes } from 'react'
import Thing from './Thing'

const ThingList = ({ things }) => (
  <ul>
    {things.map(thing =>
      <Thing
        key={thing.id}
        thing={thing}
        {...thing}
      />
    )}
  </ul>
)

ThingList.propTypes = {
 things: PropTypes.array.isRequired
}

export default ThingList