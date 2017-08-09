const nest = require('depnest')
const isEqual = require('lodash/isEqual')

exports.gives = nest('history.sync.push')

exports.needs = nest({
  'history.obs.location': 'first',
  'history.obs.store': 'first'
})

exports.create = (api) => {
  return nest('history.sync.push', push)

  function push (location) {
    const currentLocation = api.history.obs.location()()

    if (isEqual(location, currentLocation)) return false

    const history = api.history.obs.store()
    history.push(location)
  }
}

