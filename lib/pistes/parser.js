var htmlparser = require('htmlparser2');

module.exports = parserStream;

parserStream.html = parseHtml;


function parseHtml(html, parse, fn) {
  var stream = parserStream(parse, fn);
  stream.write(html);
  stream.end();
}

function normalize(str) {
  return str.replace(/\s+/g, ' ');
}

// special version of DomHandler that ignores empty text nodes
// for compatibility with old `ignoreWhitespace` option that is not longer supported
class IgnoreEmptiesDomHandler extends htmlparser.DomHandler {
  ontext (data) {
    var lastTag;

    if (
      !this._tagStack.length &&
      this.dom.length &&
      (lastTag = this.dom[this.dom.length-1]) &&
      lastTag.type === 'text'
    ) {
      lastTag.data = normalize(lastTag.data + data);
    } else {
      if (
        this._tagStack.length &&
        (lastTag = this._tagStack[this._tagStack.length - 1]) &&
        (lastTag = lastTag.children[lastTag.children.length - 1]) &&
        lastTag.type === 'text'
      ) {
        lastTag.data = normalize(lastTag.data + data);
      } else {

        data = normalize(data);

        if (data !== ' ') {
          this._addDomElement({
            data: data,
            type: 'text'
          });
        }

      }
    }
  }
}

/**
 * Creates a writeable stream (you can pipe data from request or file stream to it),
 * that will use 'parse' function and 'fn' callback to retrieve info from HTML
 *
 * @param parse(dom, fn) - receives dom tree method and fn callback
 * @param fn(err, data) - callback that receives identified data pieces (or error),
 *    first error should stop parsing
 */
function parserStream(parse, fn) {
  function handle(err, dom) {
    if (err) {
      return fn(err);
    }
    fn(null, parse(dom));
  }

  var parser = new htmlparser.WritableStream(new IgnoreEmptiesDomHandler(handle), {
    decodeEntities: true,
    lowerCaseTags: true,
    lowerCaseAttributeNames: false
  });
  parser.on('error', fn);
  return parser;
}
