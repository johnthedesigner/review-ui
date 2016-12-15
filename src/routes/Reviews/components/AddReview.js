import React from 'react'

let input

export const AddReview = (props) => (

  <form onSubmit={(e) => {
    e.preventDefault()
    if (!input.value.trim()) {
      return
    }
    props.clickAddReview(input.value)
    input.value = ''
  }}>
    <input ref={node => {
      input = node
    }} />
    <button type="submit">
      Add Review
    </button>
  </form>
)

export default AddReview
