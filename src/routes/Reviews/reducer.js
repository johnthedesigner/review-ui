import _ from 'lodash'
import faker from 'faker' // TODO remove this when IDs come from server

import { ADD_REVIEW } from './constants'

function getDate() {
  let d = new Date();
  return d
}

export default function reviews(state = {}, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return Object.assign({},state,{
        items: [
          {
            ...action.review,
            id: faker.random.uuid(),
            createdDate: getDate()
          },
          ...state.items
        ]
      })
    default:
      return state
  }
}