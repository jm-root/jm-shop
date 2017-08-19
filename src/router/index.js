import error from 'jm-err'
import daorouter from 'jm-ms-daorouter'
import MS from 'jm-ms-core'

let ms = new MS()
let Err = error.Err
export default function (opts = {}) {
  let service = this
  let t = function (doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      }
    }
    return doc
  }

  let router = ms.router()
  this.onReady().then(() => {
    router.add('/products', 'get', function (opts, cb) {
      cb(null, {
        rows: [
          {
            id: '1212112',
            title: '红酒',
            intro: '介绍',
            content: '内容',
            prict: '100',
            tb: '50'

          },
          {
            id: '121332112',
            title: '红酒2',
            intro: '介绍',
            content: '内容',
            prict: '100',
            tb: '50'
          }
        ]
      })
    })

    router.add('/products/:id', 'get', function (opts, cb) {
      cb(null, {
        id: '1212112',
        title: '红酒',
        intro: '介绍',
        content: '内容',
        prict: '100',
        tb: '50'
      })
    })
  })
  return router
};
