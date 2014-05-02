# from2 [![Flattr this!](https://api.flattr.com/button/flattr-badge-large.png)](https://flattr.com/submit/auto?user_id=hughskennedy&url=http://github.com/hughsk/from2&title=from2&description=hughsk/from2%20on%20GitHub&language=en_GB&tags=flattr,github,javascript&category=software)[![experimental](http://hughsk.github.io/stability-badges/dist/experimental.svg)](http://github.com/hughsk/stability-badges) #

Convience wrapper for
[readable-stream](http://github.com/isaacs/readable-stream)'s `ReadableStream`
base class, with an API lifted from
[from](http://github.com/dominictarr/from) and
[through2](http://github.com/rvagg/through2).

## Usage ##

[![from2](https://nodei.co/npm/from2.png?mini=true)](https://nodei.co/npm/from2)

### `stream = from2([opts], readFunction)` ###

Where `opts` are the options to pass on to the `ReadableStream` constructor,
and `readFunction(size)` is called when data is requested from the stream.
Consul the documentation of [stream.Readable](http://nodejs.org/api/stream.html#stream_class_stream_readable_1)
for the exact rules of the `readFunction` (i.e. `this._read`).

For example, here's a readable stream that emits the contents of a given
string:

``` javascript
var from = require('from2')

module.exports = fromString

function fromString(string) {
  return from(function(size, next) {
    // if there's no more content
    // left in the string, close the stream.
    if (string.length <= 0) return this.push(null)

    // Pull in a new chunk of text,
    // removing it from the string.
    var chunk = string.slice(0, size)
    string = string.slice(size)

    // Emit "chunk" from the stream.
    this.push(chunk)
  })
}

// pipe "hello world" out
// to stdout.
fromString('hello world').pipe(process.stdout)
```

### `stream = from2.obj([opts], read)` ###

Shorthand for `from2({ objectMode: true }, readFunction)`.

### `createStream = from2.ctor([opts], readFunction)` ###

If you're creating similar streams in quick succession you can improve
performance by generating a stream **constructor** that you can reuse instead
of creating one-off streams on each call.

Takes the same options as `from2`, instead returning a constructor which you
can use to create new streams.

## License ##

MIT. See [LICENSE.md](http://github.com/hughsk/from2/blob/master/LICENSE.md) for details.
