const { Array: MutantArray, computed } = require('mutant')
const {last, isEqual} = require('lodash')
const nest = require('depnest')

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

  return nest({
    'history.sync.push': (newLocation) => {
      if (isEqual(newLocation, location)) return false
      history.push(newLocation)
    },
    'history.sync.back': () => {
      if (history().length === 1) return false
      history.pop()
    },
    'history.obs.store': () => history,
    'history.obs.location': () => location
  })
}

