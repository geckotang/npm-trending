var fs = require('fs')
var path = require('path')
var assign = require('object-assign')
var file = require('./utils/yesterday') + '.json'
var cache = path.join( __dirname, '.cache')
var trend = JSON.parse(fs.readFileSync(path.join(cache, file), 'utf8'))
var option = {
  offset: 0,
  limit: 25,
}

module.exports = function (opt) {
  var stdout = {}
  assign(option, opt)
  for (var i = option.offset; option.limit > i; i++) {
    stdout[i + 1] = trend[i]
  }
  return stdout
}
