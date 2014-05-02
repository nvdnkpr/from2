var Readable = require('readable-stream').Readable
var inherits = require('inherits')

module.exports = from2

from2.ctor = ctor
from2.obj = obj

function from2(opts, read) {
  return new (ctor(opts, read))
}

function ctor(opts, read) {
  if (typeof opts === 'function') {
    read = opts
    opts = {}
  }

  opts = defaults(opts)

  inherits(Class, Readable)
  function Class() {
    if (!(this instanceof Class)) return new Class
    Readable.call(this, opts)
  }

  Class.prototype._read = read
  return Class
}

function obj(opts, read) {
  if (typeof opts === 'function') {
    read = opts
    opts = {}
  }

  opts = defaults(opts)
  opts.objectMode = true

  return from2(opts, read)
}

function defaults(opts) {
  opts = opts || {}
  return opts
}
