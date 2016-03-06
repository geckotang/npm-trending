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
  var trend = getTrending(0)
  res.type('.html').send(render(tpl, {pkg: trend}))
})

app.get('/page/:number', function (req, res) {
  var page = req.params.number
  var hasOnlyNumber =  /^[0-9]*$/.test(page)
  if (!hasOnlyNumber) res.status(404).send('/page/:number can has only Number')
  var trend = getTrending(page)
  if (Object.keys(trend).length === 0) res.status(418).send("I'm a teapot.")
  res.type('.html').send(render(tpl, {pkg: trend}))
})

app.listen(process.env.PORT || 3000, function () {
})
