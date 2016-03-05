var date = new Date()
var year = date.getFullYear()
var month = addLeadingZero(date.getMonth() + 1)
var day = addLeadingZero(date.getDate())

function addLeadingZero (num) {
  return ('0' + num).slice(-2)
}

module.exports = year + '-' + month + '-' + day
