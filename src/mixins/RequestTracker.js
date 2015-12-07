var RequestTracker = {
  componentWillMount: function() {
    console.log('request tracker')
//    this.intervals = [];
  },
  setInterval: function() {
//    this.intervals.push(setInterval.apply(null, arguments));
  },
  componentWillUnmount: function() {
//    this.intervals.forEach(clearInterval);
  }
};  
export default RequestTracker