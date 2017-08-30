'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var service = this;
  var t = function t(doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      };
    }
    return doc;
  };

  var router = ms.router();
  router.use((0, _help2.default)(service)).use(function (opts, cb, next) {
    if (!service.ready) {
      return cb(null, t(Err.FA_NOTREADY, opts.lng));
    }
    next();
  });

  this.onReady().then(function () {
    router.use('/users', service._user_router(opts)).use('/categorys', (0, _category2.default)(service, opts)).use('/products', (0, _product2.default)(service, opts)).use('/orders', (0, _order2.default)(service, opts)).use('/addresses', (0, _address2.default)(service, opts));
  });
  return router;
};

var _jmErr = require('jm-err');

var _jmErr2 = _interopRequireDefault(_jmErr);

var _jmMsCore = require('jm-ms-core');

var _jmMsCore2 = _interopRequireDefault(_jmMsCore);

var _help = require('./help');

var _help2 = _interopRequireDefault(_help);

var _category = require('./category');

var _category2 = _interopRequireDefault(_category);

var _product = require('./product');

var _product2 = _interopRequireDefault(_product);

var _order = require('./order');

var _order2 = _interopRequireDefault(_order);

var _address = require('./address');

var _address2 = _interopRequireDefault(_address);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ms = new _jmMsCore2.default();
var Err = _jmErr2.default.Err;
;
module.exports = exports['default'];