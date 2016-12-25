import React from 'react'
import { browserHistory } from 'react-router'

let titleInput, contentInput, ratingInput

let submitAddReview = (e, props) => {
  e.preventDefault()
  if (!titleInput.value.trim()) {
    return
  }
  let review = {
    title: titleInput.value,
    content: contentInput.value,
    rating: ratingInput.value - 0 // TODO better way to force number type?
  }
  props.clickAddReview(review)
  titleInput.value = ''
  contentInput.value = ''
  ratingInput.value = ''
}

export const AddReview = (props) => (

  <form onSubmit={(e) => { submitAddReview(e, props) }}>
    <fieldset>
      <label>Review Title</label>
      <input ref={node => {
        titleInput = node
      }} required />
    </fieldset>
    <fieldset>
      <label>Review Text</label>
      <input ref={node => {
        contentInput = node
      }} required />
    </fieldset>
    <fieldset>
      <label>Select a Rating</label>
      <select ref={node => {
        ratingInput = node
      }} required>
        <option value='1'>1</option>
        <option value='2'>2</option>
        <option value='3'>3</option>
        <option value='4'>4</option>
        <option value='5'>5</option>
      </select>
    </fieldset>
    <button type="submit">
      Add Review
    </button>
  </form>
)

export default AddReview
