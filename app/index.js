var fs = require('fs')
var path = require('path')
var express = require('express')
var render = require('ejs').render
var app = express()
var trending = require('../lib/trending')
var tpl = fs.readFileSync(path.join(__dirname, 'tpl/index.ejs'), 'utf8')

function getTrending (page) {
  var opt = {offset: Number(page) * 25}
  var data = trending(opt)
  return data
}

app.get('/', function (req, res) {
  res.type('.html').send(render(tpl))
})

app.get('/page/:number', function (req, res) {
  var page = req.params.number
  var hasOnlyNumber =  /^[0-9]*$/.test(page)
  if (!hasOnlyNumber) res.status(404).send('/page/:number can has only Number')
  var trend = getTrending(page)
  res.type('.html').send(render(tpl))
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})
