import { ADD_REVIEW } from './constants'

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
      let id = Math.floor((Math.random() * 100000) + 1)
      return Object.assign({},state,{
        items: [
          ...state.items,
          {
            id: id, // Temprandom numbers for ids
            title: action.title
          }
        ]
      })
      return state
    default:
      return state
  }
}