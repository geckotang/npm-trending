var date = new Date()
var year = date.getFullYear()
var month = date.getMonth()
var day = date.getDate()

var yesterday = new Date(year, month, day - 1)
var yYear = yesterday.getFullYear()
var yMonth = addLeadingZero(yesterday.getMonth() + 1)
var yDay = addLeadingZero(yesterday.getDate())

function addLeadingZero (num) {
  return ('0' + num).slice(-2)
}

module.exports = yYear + '-' + yMonth + '-' + yDay
