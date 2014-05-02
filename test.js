var test = require('tape')
var path = require('path')
var from = require('./')
var fs   = require('fs')

var tmp = path.resolve(
  __dirname, 'tmp.txt'
)

function fromString(string) {
  return from(function(size) {
    if (string.length <= 0) return this.push(null)
    var chunk = string.slice(0, size)
    string = string.slice(size)
    this.push(chunk)
  })
}

test('from2', function(t) {
  var contents = fs.readFileSync(__filename, 'utf8')
  var stream = fromString(contents)

  stream
    .pipe(fs.createWriteStream(tmp))
    .on('close', function() {
      t.equal(fs.readFileSync(tmp, 'utf8'), contents)
      fs.unlinkSync(tmp)
      t.end()
    })
})

test('old mode', function(t) {
  var contents = fs.readFileSync(__filename, 'utf8')
  var stream = fromString(contents)
  var buffer = ''

  stream.on('data', function(data) {
    buffer += data
  }).on('end', function() {
    t.equal(buffer, contents)
    t.end()
  })
})
