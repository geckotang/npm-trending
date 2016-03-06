var fs = require('fs')
var path = require('path')
var assign = require('object-assign')
var file = require('./utils/yesterday') + '.json'
var cache = path.join( __dirname, '../.cache')
var trend = JSON.parse(fs.readFileSync(path.join(cache, file), 'utf8'))
var option = {
  offset: 0,
  limit: 25,
}

module.exports = function (opt) {
  assign(option, opt)
  return trend.slice(option.offset, option.offset + option.limit)
}
