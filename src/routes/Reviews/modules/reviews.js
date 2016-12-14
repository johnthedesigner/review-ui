// Constants
export const ADD_REVIEW = 'ADD_REVIEW'

// Action Creators
export function AddReview (title) {
  return {
    type : ADD_REVIEW,
    title : title
  }
}

export const actions = {
  AddReview
}

// Action Handlers
const ACTION_HANDLERS = {
  [ADD_REVIEW]    : (state={}, action) => Object.assign({},state,{
    title: action.title
  }),
}

// Reducer
const initialState = [
  {
    id: 0,
    title:'test review 1'
  },
  {
    id: 1,
    title:'test review 2'
  }
]
export default function ReviewReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
