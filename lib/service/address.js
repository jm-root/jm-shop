'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var schema = opts.schema || (0, _address2.default)();

  var model = _jmDao2.default.dao({
    db: opts.db,
    modelName: opts.modelName || 'address',
    tableName: opts.tableName,
    prefix: opts.tableNamePrefix,
    schema: schema,
    schemaExt: opts.schemaExt
  });
  _jmEvent2.default.enableEvent(model);

  return model;
};

var _jmDao = require('jm-dao');

var _jmDao2 = _interopRequireDefault(_jmDao);

var _jmEvent = require('jm-event');

var _jmEvent2 = _interopRequireDefault(_jmEvent);

var _address = require('../schema/address');

var _address2 = _interopRequireDefault(_address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;
module.exports = exports['default'];