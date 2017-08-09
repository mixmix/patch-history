const nest = require('depnest')
const { Array: MutantArray } = require('mutant')

exports.gives = nest('history.obs.store')

exports.create = (api) => {
  var _store = MutantArray()

  return nest('history.obs.store', () => _store)
}

