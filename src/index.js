import service from './service'
import router from './router'

export default (opts = {}) => {
  ['db', 'tableNamePrefix']
    .forEach(function (key) {
      process.env[key] && (opts[key] = process.env[key])
    })

  let o = service(opts)
  o.router = router
  return o
}
