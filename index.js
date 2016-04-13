const history = require('sheet-router/history')
const sheetRouter = require('sheet-router')
const sendAction = require('send-action')
const href = require('sheet-router/href')
const xtend = require('xtend')
const yo = require('yo-yo')

const router = createRouter()
const send = sendAction({
  onaction: onaction,
  onchange: onchange,
  state: { value: 'ok', location: document.location.pathname }
})
href((href) => send('location', { location: href }))
history((href) => send('location', { location: href }))
document.body.appendChild(router(send.state().location, send.state()))

function onchange (action, state) {
  const el = document.querySelector('#root')
  yo.update(el, router(state.location, state))
}

function onaction (action, state) {
  if (action.type === 'location') {
    return xtend(state, { location: action.location })
  }
  if (action.type === 'example') {
    return xtend(state, { value: action.value })
  }
  return state
}

function createRouter () {
  return sheetRouter(function (r, t) {
    return [
      r('/', () => yo`<a href="/admin" id="root">slash</a>`),
      r('/admin', () => yo`<a href="/" id="root">admin</a>`)
    ]
  })
}
