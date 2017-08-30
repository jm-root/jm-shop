'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var o = (0, _jmUser2.default)(opts);
  o._user_router = o.router;
  o.router = _router2.default;

  o.onReady().then(function () {
    o.product = require('./product')(o, opts);
    o.order = require('./order')(o, opts);
    o.address = require('./address')(o, opts);
  });

  return o;
};

var _jmUser = require('jm-user');

var _jmUser2 = _interopRequireDefault(_jmUser);

var _router = require('../router');

var _router2 = _interopRequireDefault(_router);

var _locale = require('../locale');

var _locale2 = _interopRequireDefault(_locale);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

;

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
module.exports = exports['default'];