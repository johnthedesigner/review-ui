'use strict'
import Promise from 'promise'
import Request from 'request'
import Storage from './storage'

const BasePath = 'http://0.0.0.0:8888/api'

const postTo = function(path, data, cb) {
  let promise = new Promise(function (resolve, reject) {
    Request.post({url: path, form: data}, function (err, res) {
      let body = JSON.parse(res.body)
      cb(body)
    })
  })
}

const API = {
  
  // Get a specific review by ID from fixtures
  login(username, password, cb) {
    let path = BasePath + '/reviewers/login'
    let auth = {
      username: username,
      password: password
    }
    postTo(path, auth, cb)
  }
  
}

export default API