const SecretStack = require('secret-stack')
const config = require('ssb-config')
const caps = require('ssb-caps')
const pull = require('pull-stream')

const stack = SecretStack({ caps })
      .use(require('ssb-db'))
      .use(require('ssb-backlinks'))
      .use(require('ssb-query'))
      .use(require('ssb-private1'))

const sbot = stack({
  path: './data'
})

function status() {
  setTimeout(() => {
    console.log(sbot.progress())
    status()
  }, 200)
}

// status()

/*
pull(
  sbot.createHistoryStream({id: "@Ut2WaeG6i955UnvCiWuQ8w0eAz0rLjAc+XAS7UufNhc=.ed25519", limit: 2}),
  pull.collect((err, messagesArray) => {
    console.log(messagesArray)
    console.log(messagesArray.map(x => x.value))
  })
)
*/

console.time("db1")
sbot.get('%uQnNkrG/jlt7XbSOcDwaF8qWOqh1oFgn/tiVGcRhj9I=.sha256', (err, msg) => {
  console.timeEnd("db1")
  // FIXME: a tiny bit buggy, see https://github.com/ssb-ngi-pointer/ssb-fixtures/issues/4
  console.log(msg)
  sbot.close()
})
