const SecretStack = require('secret-stack')
const caps = require('ssb-caps')
const ssbKeys = require('ssb-keys')

const keys = ssbKeys.loadOrCreateSync("./data/secret")

const stack = SecretStack({ caps })
  .use(require('ssb-db2'))
  .use(require('ssb-db2/compat/ebt'))
  .use(require('ssb-db2/full-mentions'))

const sbot = stack({
  keys,
  path: './data'
})

console.time("db2")
sbot.db.onDrain('base', () => {
  sbot.db.get('%uQnNkrG/jlt7XbSOcDwaF8qWOqh1oFgn/tiVGcRhj9I=.sha256', (err, msg) => {
    console.timeEnd("db2")
    // FIXME: a tiny bit buggy, see https://github.com/ssb-ngi-pointer/ssb-fixtures/issues/4
    console.log(msg)
    sbot.close()
  })
})
