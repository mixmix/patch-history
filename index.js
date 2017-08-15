const { Array: MutantArray, computed } = require('mutant')
const nest = require('depnest')
const last = require('lodash/last')
const isEqual = require('lodash/isEqual')


exports.gives = nest({
  'history.obs.location':true,
  'history.sync.back': true,
  'history.sync.push': true,
  'history.obs.store': true,
})

exports.create = function (api) {
  var history = MutantArray()
  var location = computed(history, history => {
    return last(history)
  })

  function back () {
    if (history().length === 1) return false
    history.pop()
  }

  function push (newLocation) {
    if (isEqual(newLocation, location)) return false
    history.push(newLocation)
  }

  return nest({
    'history.sync.push': push,
    'history.sync.back': back,
    'history.obs.store': () => history,
    'history.obs.location': () => location
  })

}

