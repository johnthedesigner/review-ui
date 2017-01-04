import fetch from 'node-fetch'
import { browserHistory } from 'react-router'
import { normalize, Schema, arrayOf } from 'normalizr'

import { consoleGroup } from '../../utils/utils'
import { receiveReviews } from '../Reviews/actions'
import {
  POST_NEW_THING,
  RECEIVE_CURRENT_THING,
  RECEIVE_THING_LIST,
  RECEIVE_THINGS,
  REQUEST_CURRENT_THING,
  REQUEST_THING_LIST,
} from './constants'

// Normalize Things API Response
const thingSchema = new Schema('things')
const thingReviewsSchema = new Schema('reviews')
const errorSchema = new Schema('errors', {idAttribute:'name'})
thingSchema.define({
  reviews: arrayOf(thingReviewsSchema),
  error: errorSchema
})

export function postNewThing() {
  return {
    type: POST_NEW_THING
  }
}

function receiveCurrentThing(id) {
  return {
    type: RECEIVE_CURRENT_THING,
    id: id
  }
}

function receiveThingList(items) {
  return {
    type: RECEIVE_THING_LIST,
    items: items
  }
}

export function receiveThings(things) {
  return {
    type: RECEIVE_THINGS,
    things: things
  }
}

export function requestCurrentThing() {
  return {
    type: REQUEST_CURRENT_THING
  }
}

export function requestThingList() {
  return {
    type: REQUEST_THING_LIST
  }
}

export function fetchCurrentThing(id) {
  return dispatch => {
    dispatch(requestCurrentThing())
    return fetch(`https://review-api.herokuapp.com/api/things/${id}/?filter[include]=reviews`)
      .then(response => response.json())
      .then(json => {
        let normalized = normalize(json, thingSchema)
        dispatch(receiveThings(normalized.entities.things))
        dispatch(receiveReviews(normalized.entities.reviews))
        dispatch(receiveCurrentThing(normalized.result))
      }
    )
  }
}

export function fetchThingList() {
  return dispatch => {
    dispatch(requestThingList())
    return fetch('https://review-api.herokuapp.com/api/things?filter[include]=reviews')
      .then(response => response.json())
      .then(json => {
        let normalized = normalize(json, arrayOf(thingSchema))
        dispatch(receiveThings(normalized.entities.things))
        dispatch(receiveReviews(normalized.entities.reviews))
        dispatch(receiveThingList(normalized.result))
      })
  }
}

export function createNewThing(thing, access_token) {
  return dispatch => {
    dispatch(postNewThing())
    let body = JSON.stringify(thing)
    let options = {
      method: 'POST',
      body: body,
      headers: { 'Content-Type': 'application/json' }
    }
    return fetch(`https://review-api.herokuapp.com/api/things?access_token=${access_token}`,options)
      .then(response => response.json())
      .then(json => {
        let normalized = normalize(json, thingSchema)
        dispatch(receiveThings(normalized.entities.things))
        dispatch(receiveReviews(normalized.entities.reviews))
        dispatch(receiveCurrentThing(normalized.result))
        browserHistory.push(`/thing/${json.id}`)
      })
  }
}
