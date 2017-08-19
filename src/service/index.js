import jm from 'jm-dao'
import event from 'jm-event'
import Promise from 'bluebird'
import t from '../locale'

/**
 * shop service
 * @param {Object} opts
 * @example
 * opts参数:{
 *  db: 数据库
 *  tableNamePrefix: (可选, 表名前缀, 默认为'')
 * }
 * @return {Object} service
 */
export default function (opts = {}) {
  let db = opts.db

  let o = {
    ready: false,
    t: t,

    onReady: function () {
      let self = this
      return new Promise(function (resolve, reject) {
        if (self.ready) return resolve(self.ready)
        self.on('ready', function () {
          resolve()
        })
      })
    }

  }
  event.enableEvent(o)

  let cb = function (db) {
    opts.db = db
    o.sq = jm.sequence({db: db})
    o.product = require('./product')(o, opts)
    o.ready = true
    o.emit('ready')
  }

  if (!db) {
    db = jm.db.connect().then(cb)
  } else if (typeof db === 'string') {
    db = jm.db.connect(db).then(cb)
  }

  return o
};
