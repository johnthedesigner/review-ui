import localforage from 'localforage'

const Storage = {
  
//  KEYS = {
//    token: 'auth_token',
//    user: 'username',
//    email: 'email'
//  },
  
  setItem(key, value) {
    localforage.setItem(key, value).then(function(value) {
      //alert(value + ' was set!')
    }, function(error) {
      console.error(error)
    })
  },
  
  getItem(key) {
    localforage.getItem(key, function(err, value) {
      if (err) {
        console.error('Oh noes!')
      } else {
        //alert(value)
      }
    })
  }
  
}

export default Storage