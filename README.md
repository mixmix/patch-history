# Patch-history

Manage your history state in patchcore based apps.
Patchcore and related modules use [depject](https://github.com/depject/depject) to provide (`give`) and consume (`need`) dependencies.

## API

### `history.obs.store`

_(Not generally for public use)_

The history store in the form of a [Mutant Array](https://github.com/mmckegg/mutant#array). This is an _observeable_, which is excellent for building things with Mutant.


### `history.obs.location`

The current location as in history, as [Mutant Value](https://github.com/mmckegg/mutant#value).

A crude was to access the contents of a Mutant observeable is to call it:
```js
const currentLocation = api.history.obs.location() // observeable
currentLocation() // => array
```

You can also subscribe listeners which will be called when the observeable updates:
```
const listener = (location) => console.log('new location', location)
currentLocation(listener)
```

### `history.sync.push` 

A synchronous method which allows you to push a new location onto the end of the history.

### `history.sync.back`

A synchronous method which moves the current location back a step in histroy.


## Example


```js
// main.js
const combine = require('depject')
const entry = require('depject/entry')
const nest = require('depnest')

const sockets = combine(
  require('./index.js'), // an object of depject modules
  require('patch-history'),
  require('patchcore')
)

const api = entry(sockets, nest('app.html.app', 'first'))
const app = api.app.html.app()

```

```js
// homePage.js
const html = require('yo-yo')

export.gives = nest('app.page.homePage')

exports.needs = nest({
  'history.sync.push': 'first'
  'history.sync.back': 'first'
})

exports.create = (api) => {
  return nest('app.page.homePage', homePage)

  function homePage () {
    const goToSettings = () => api.history.sync.push({ page: '/settings' }) 
    // you can push whatever you want into history, it's just an array

    return html`
      <div>
        <h1>Home Page</h1>
        <button onclick=${goToSettings}> settings </button>
      <div>
   `
  }
} 

```

```js
// app.js
export.gives = nest('app.html.app')

exports.needs = nest({
  'history.obs.location': 'first',
  'history.sync.push': 'first',
  'router.sync.router': 'first'
})

exports.create = (api) => {
  return nest('app.html.app', app)

  function app () {
    const currentLocation = api.history.obs.location()
    currentLocation(renderPage)
    // currentLocation is an observable which can be passed listeners
    // these will be called when the location changes

    api.history.sync.push({ page: '/home' })
  }

  function renderPage (newLocation) {
    const newView = api.route.sync.router(newLocation)

    document.body.appendChild(newView)
    // crude 'rendering'!
  }
} 
```

