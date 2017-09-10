import error from 'jm-err'
import daorouter from 'jm-ms-daorouter'
import MS from 'jm-ms-core'

let ms = new MS()
let Err = error.Err
export default function (service, opts = {}) {
  let t = function (doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      }
    }
    return doc
  }

  var listOpts = opts.list || {
    conditions: {},
    options: {
      sort: [{'crtime': -1}]
    },
    fields: {},
    populations: [
      {
        path: 'user',
        select: 'nick'
      },
      {
        path: 'products.product',
        select: 'name price'
      }
    ]
  }

  var getOpts = opts.get || {
    fields: {},
    populations: [
      {
        path: 'user',
        select: 'nick'
      },
      {
        path: 'products.product',
        select: 'name price'
      }
    ]
  }

  let router = ms.router()
  service.onReady().then(() => {
    router
      .add('/', 'get', function (opts, cb, next) {
        opts.conditions || (opts.conditions = {})
        if (opts.data.userId) {
          opts.conditions.user = opts.data.userId
        }
        if (opts.data.status) {
          opts.conditions.status = opts.data.status
        }
        next()
      })
      .use(daorouter(service.order, {
        list: listOpts,
        get: getOpts
      }))
  })
  return router
};
