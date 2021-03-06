const should = require('should');
const { createReadStream } = require('fs');
const parser = require('../../lib/lifts/parser');
const parse = require('../../lib/lifts/parse')('${ id }');

/*global describe, it */
describe('parse ${ id }', function() {

  it('should return lift status', function(done) {
    var stream = createReadStream(__dirname + '/example/${ id }.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'lift 1': 'open',
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
