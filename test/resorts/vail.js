var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('vail');

/*global describe, it */
describe('parse vail', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/vail.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'Avanti Express Lift #2': 'open',
        'Black Forest #27': 'closed',
        'Born Free Express #8': 'open',
        'Cascade Village #20': 'closed',
        'Eagle Bahn Gondola #19': 'open',
        'Eagle\'s Nest Carpet #18': 'closed',
        'Eagle\'s Nest Carpet #35': 'closed',
        'Earl\'s Express #38': 'closed',
        'Game Creek Express #7': 'open',
        'Golden Peak Carpet #25': 'open',
        'Golden Peak Carpet #29': 'open',
        'Golden Peak Carpet #33': 'open',
        'Golden Peak T-Bar #16': 'closed',
        'Gopher Hill #12': 'open',
        'High Noon Express #5': 'open',
        'Highline Express #10': 'closed',
        'Lionshead Carpet #34': 'open',
        'Little Eagle #15': 'open',
        'Mongolia Lift #22': 'closed',
        'Mountain Top Express #4': 'open',
        'Northwoods Express #11': 'open',
        'One': 'open',
        'Orient Express Lift #21': 'closed',
        'Pete\'s Express #39': 'closed',
        'Pride Express Lift #26': 'closed',
        'Riva Bahn Express #6': 'open',
        'SkyLine Express #37': 'closed',
        'Sourdough Express #14': 'open',
        'Sun Up Express #9': 'open',
        'Tea Cup Express #36': 'closed',
        'Wapiti #24': 'closed',
        'Wildwood Express #3': 'open'
      };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
