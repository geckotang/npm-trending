var fs = require('fs')
var path = require('path')
var async = require('async')
var assign = require('object-assign')
var request = require('request')
var yesterday = require('../lib/utils/yesterday')
var file = yesterday + '.json'
var cache = path.join( __dirname, '../.cache')
var trends = JSON.parse(fs.readFileSync(path.join(cache, file), 'utf8'))
var url = 'https://api.npmjs.org/downloads/point/'
var opt = {
  headers: {
    'User-Agent': 'npm-trending',
  },
  rejectUnauthorized: false,
  json: true
}
var out = []


async.forEach(trends, function(pkg, cb) {
  request(assign({url: url + yesterday + '/' + pkg.name}, opt), function (e, res) {
    console.log('fetch: ', url + yesterday + '/' + pkg.name)
    res = res || {}
    res.body = res.body || {}
    if (res.body.downloads) {
      pkg.downloads = res.body.downloads
    } else {
      pkg.downloads = 0
    }
    out.push(pkg)
    setTimeout(cb(), 1000) // 💤
  })
}, function () {
  fs.writeFileSync(path.join(cache, file), JSON.stringify(out))
})
