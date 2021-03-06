var should = require('should');
var fs = require('fs');
var parser = require('../../lib/lifts/parser');
var parse = require('../../lib/lifts/parse')('lesmenuires');

/*global describe, it */
describe('parse lesmenuires', function() {

  it('should return lift status', function(done) {
    var stream = fs.createReadStream(__dirname + '/example/lesmenuires.html');
    stream.on('error', done);
    stream.pipe(parser(parse, function(err, status) {
      var expected = {
        'TC MASSE 1': 'scheduled',
          'TC MASSE 2': 'closed',
          'TB CROISETTE': 'scheduled',
          'TSD REBERTY': 'scheduled',
          'TS LAC NOIR': 'closed',
          'TS ROCHER NOIR': 'scheduled',
          'TS TORTOLLET': 'scheduled',
          'TK MASSE': 'closed',
          'TC ST MARTIN 1': 'scheduled',
          'TSD DES GRANGES': 'closed',
          'TSD ST MARTIN 2': 'scheduled',
          'TK DES TEPPES': 'closed',
          'TK DU VILLAGE': 'scheduled',
          'TAPIS DE ST MARTIN': 'scheduled',
          'MERIBEL-ST MARTIN2': 'closed',
          'MOTTARET-- TSD ROC': 'closed',
          'MOTTARET-GRANGES': 'closed',
          'MOTTARET-TEPPES': 'closed',
          'ST MARTIN-BECCA': 'closed',
          'menuires - val tho': 'closed',
          'menuires -StMartin': 'closed',
          'menuires-3 vallees': 'closed',
          'TC BRUYERES 1': 'scheduled',
          'TC BRUYERES 2': 'closed',
          'TSD DORON': 'scheduled',
          'TSD MONT CHAMBRE': 'closed',
          'TSD SUNNY EXPRESS': 'scheduled',
          'TK MONTAULEVER': 'closed',
          'TAPIS DE REBERTY': 'scheduled',
          'TAPIS DES BRUYERES': 'scheduled',
          'TAPIS DES PLANS': 'scheduled',
          'MOTTARET-BECCA': 'closed',
          'MOTTARET-BRUYERES2': 'closed',
          'MOTTARET-CHAMBRE': 'closed',
          'VAL THO-BRUYERES2': 'closed',
          'VAL THO-CHAMBRE': 'closed',
          'VAL THO-MONTAULEV': 'closed',
          'MERIBEL ALPINA VIA TOUGNETTE': 'closed',
          'MERIBEL MOTTARET VIA 3 MARCHES': 'closed',
          'MERIBEL MOTTARET VIA MONT DE LA CHAMBRE': 'closed',
          'TPH PREYERAND': 'open',
          'TC ROC 1': 'scheduled',
          'TSD BECCA': 'closed',
          'TSD MENUIRES': 'scheduled',
          'TSD ROC 2': 'closed',
          'TS BETTEX': 'scheduled',
          'TS MONTAGNETTE': 'scheduled',
          'TK JARDIN ENFANTS': 'scheduled',
          'TK STADE SLALOM': 'scheduled',
          'TAPIS PELVOUX': 'scheduled',
          'TAPIS PREYERAND': 'scheduled'
              };
      should.exist(status);
      status.should.eql(expected);
      done(err);
    }));
  });
});
