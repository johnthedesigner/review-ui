var RequestUtils = {
  isPending(requests, type, id) {
//    console.group('check requests')
    if (requests[type] != undefined){
      if (requests[type].status != undefined && requests[type].status === 'pending'){
//        console.log('is pending')
//        console.groupEnd()
        return true
      } else if (requests[type][id] != undefined && requests[type][id].status === 'pending'){
//        console.log('is pending')
//        console.groupEnd()
        return true
      } else {
//        console.log('not pending')
//        console.groupEnd()
        return false
      }
    } else {
//      console.log('not pending')
//      console.groupEnd()
      return false
    }
  }
}
export default RequestUtils