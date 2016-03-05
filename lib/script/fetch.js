var fs = require('fs')
var path = require('path')
var mkdirp = require('mkdirp')
var request = require('request')
var touch = require('touch')
var today = require('../utils/today')
var cache = path.join( __dirname, '..', '.cache')
var file = path.join(cache, today + '.json')
var url = 'https://registry.npmjs.org/-/all/static/today.json'
var options = {
  url: url,
  headers: {
    'User-Agent': 'npm-trending',
    host: 'registry.npmjs.org'
  },
  rejectUnauthorized: false,
  json: true
}

mkdirp.sync(cache)

try {
  fs.accessSync(file)
} catch (e) {
  touch.sync(file)
}

request.get(options, function (err, res) {
  if (err) return
  fs.writeFileSync(file, JSON.stringify(res.body))
})
