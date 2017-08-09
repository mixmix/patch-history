const nest = require('depnest')
const last = require('lodash/last')

exports.gives = nest('history.sync.back')

exports.needs = nest({
  'history.obs.store': 'first'
})

exports.create = (api) => {
  return nest('history.sync.back', back)

  function back () {
    const history = api.history.obs.store()
    if (history().length === 1) return false

    history.pop()
  }
}

