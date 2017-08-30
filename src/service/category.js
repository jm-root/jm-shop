import jm from 'jm-dao'
import event from 'jm-event'
import _schema from '../schema/category'

export default function (service, opts = {}) {
  let schema = opts.schema || _schema()

  let model = jm.dao({
    db: opts.db,
    modelName: opts.modelName || 'category',
    tableName: opts.tableName,
    prefix: opts.tableNamePrefix,
    schema: schema,
    schemaExt: opts.schemaExt
  })
  event.enableEvent(model)

  return model
};
