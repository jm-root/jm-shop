'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (service) {
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var t = function t(doc, lng) {
    if (doc && lng && doc.err && doc.msg) {
      return {
        err: doc.err,
        msg: service.t(doc.msg, lng) || Err.t(doc.msg, lng) || doc.msg
      };
    }
    return doc;
  };

  var listOpts = opts.list || {
    conditions: {},
    options: {
      sort: [{ 'crtime': -1 }]
    },
    fields: {},
    populations: {
      path: 'user',
      select: {
        nick: 1
      }
    }
  };

  var getOpts = opts.get || {
    fields: {},
    populations: {
      path: 'user',
      select: {
        nick: 1
      }
    }
  };

  var router = ms.router();
  service.onReady().then(function () {
    router.add('/', 'get', function (opts, cb, next) {
      if (opts.data.userId) {
        opts.conditions || (opts.conditions = {});
        opts.conditions.user = opts.data.userId;
      }
      next();
    }).use((0, _jmMsDaorouter2.default)(service.address, {
      list: listOpts,
      get: getOpts
    }));
  });
  return router;
};

var _jmErr = require('jm-err');

var _jmErr2 = _interopRequireDefault(_jmErr);

var _jmMsDaorouter = require('jm-ms-daorouter');

var _jmMsDaorouter2 = _interopRequireDefault(_jmMsDaorouter);

var _jmMsCore = require('jm-ms-core');

var _jmMsCore2 = _interopRequireDefault(_jmMsCore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ms = new _jmMsCore2.default();
var Err = _jmErr2.default.Err;
;
module.exports = exports['default'];