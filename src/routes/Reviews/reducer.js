import { ADD_REVIEW } from './constants'
import faker from 'faker' // TODO remove this when IDs come from server

const initialState = {
  items: [
    {
      id: 0,
      title:'test review 1'
    },
    {
      id: 1,
      title:'test review 2'
    }
  ]
}

export default function reviews(state = initialState, action) {
  switch (action.type) {
    case ADD_REVIEW:
      return Object.assign({},state,{
        items: [
          ...state.items,
          {
            ...action.review,
            id: faker.random.uuid(),
          }
        ]
      })
      return state
    default:
      return state
  }
}