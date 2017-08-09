const nest = require('depnest')
const { computed } = require('mutant')
const last = require('lodash/last')

exports.gives = nest('history.obs.location')

exports.needs = nest({
  'history.obs.store': 'first'
})

exports.create = (api) => {
  var _location = null

  return nest('history.obs.location', () => {
    if (!_location) {
      const history = api.history.obs.store()
      _location = computed(history, history => {
        return last(history)
      })
    }

    return _location
  })
}

