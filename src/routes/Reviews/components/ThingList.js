import React, { PropTypes } from 'react'
import Thing from './Thing'

const ThingList = ({ things }) => (
  <div>
    {things.map(thing =>
      <Thing
        key={thing.id}
        thing={thing}
        {...thing}
      />
    )}
  </div>
)

ThingList.propTypes = {
 things: PropTypes.array.isRequired
}

export default ThingList