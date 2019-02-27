var vm = require('vm');
var debug = require('debug')('liftie:resort:vail');

var domutil = require('./domutil');
var select = require('../select');

module.exports = parse;

function extractPisteData(script) {
  function evalHelper(_, fn) {
    var data = {};
    fn(data);
    return data;
  }

  var data = vm.runInNewContext(script, { require: evalHelper });
  return data && data.TerrainStatusFeed && data.TerrainStatusFeed.GroomingAreas || [];
}


// common parser for Vail Resorts run status
function parse(dom) {
  var dataScript = select(dom, 'script')
    .map(function(script) {
      return domutil.allText(script).trim();
    })
    .filter(function(script) {
      return script.startsWith('require');
    })[0];

  var pisteStatus = extractPisteData(dataScript)
    .reduce(function(pisteStatus, area) {
        area.Runs.forEach(piste => {
          pisteStatus[area.Name + ' - ' + piste.Name.trim()] = piste.IsOpen ? 'open' : 'closed';
        });
      return pisteStatus;
    }, {});

  debug('vail Piste Status:', pisteStatus);
  return pisteStatus;
}
