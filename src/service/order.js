import Promise from 'bluebird'
import jm from 'jm-dao'
import event from 'jm-event'
import _schema from '../schema/order'

export default function (service, opts = {}) {
  let schema = opts.schema || _schema()

  function makePromise (product) {
    return new Promise((resolve) => {
      service.product
        .findById(product.product)
        .then(function (doc) {
          product.price = doc.price
          resolve(true)
        })
    })
  }

  schema.pre('save', function (next) {
    let self = this
    Promise.all(self.products.map((item) => makePromise(item))).then(res => {
      next()
    })
  })

  let model = jm.dao({
    db: opts.db,
    modelName: opts.modelName || 'order',
    tableName: opts.tableName,
    prefix: opts.tableNamePrefix,
    schema: schema,
    schemaExt: opts.schemaExt
  })
  event.enableEvent(model)

  return model
};
