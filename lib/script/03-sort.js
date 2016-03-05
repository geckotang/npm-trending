var fs = require('fs')
var path = require('path')
var yesterday = require('../utils/yesterday')
var file = path.join(__dirname, '../.cache', yesterday + '.json')
var data = JSON.parse(fs.readFileSync(file))

data.sort(function (a, b) {
  if (Number(a.downloads) > Number(b.downloads)) return -1
  if (Number(a.downloads) < Number(b.downloads)) return 1
  return 0
})

fs.writeFileSync(file, JSON.stringify(data))
