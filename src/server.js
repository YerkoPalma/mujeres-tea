import sirv from 'sirv'
import polka from 'polka'
import compression from 'compression'
import * as sapper from '@sapper/server'
const { createServer } = require('https')
const { readFileSync } = require('fs')

const { PORT, NODE_ENV } = process.env
const dev = NODE_ENV === 'development'

if (dev) {
  const options = {
    key: readFileSync('ssl/foobar.key'),
    cert: readFileSync('ssl/foobar.crt')
  }
  const { handler } = polka() // You can also use Express
    .use(
      compression({ threshold: 0 }),
      sirv('static', { dev }),
      sapper.middleware()
    )
  createServer(options, handler).listen(PORT, err => {
    if (err) console.log('error', err)
  })
} else {
  polka() // You can also use Express
    .use(
      compression({ threshold: 0 }),
      sirv('static', { dev }),
      sapper.middleware()
    )
    .listen(PORT, err => {
      if (err) console.log('error', err)
    })
}
