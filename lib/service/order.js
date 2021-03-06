'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var schema = opts.schema || (0, _order2.default)();

  function makePromise(product) {
    return new _bluebird2.default(function (resolve) {
      service.product.findById(product.product).then(function (doc) {
        product.price = doc.price;
        resolve(true);
      });
    });
  }

  schema.pre('save', function (next) {
    var self = this;
    _bluebird2.default.all(self.products.map(function (item) {
      return makePromise(item);
    })).then(function (res) {
      next();
    });
  });

  var model = _jmDao2.default.dao({
    db: opts.db,
    modelName: opts.modelName || 'order',
    tableName: opts.tableName,
    prefix: opts.tableNamePrefix,
    schema: schema,
    schemaExt: opts.schemaExt
  });
  _jmEvent2.default.enableEvent(model);

  return model;
};

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _jmDao = require('jm-dao');

var _jmDao2 = _interopRequireDefault(_jmDao);

var _jmEvent = require('jm-event');

var _jmEvent2 = _interopRequireDefault(_jmEvent);

var _order = require('../schema/order');

var _order2 = _interopRequireDefault(_order);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];