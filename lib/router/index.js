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
  this.onReady().then(function () {
    router.add('/products', 'get', function (opts, cb) {
      cb(null, {
        rows: [{
          id: '1212112',
          title: '红酒',
          intro: '介绍',
          content: '内容',
          prict: '100',
          tb: '50'

        }, {
          id: '121332112',
          title: '红酒2',
          intro: '介绍',
          content: '内容',
          prict: '100',
          tb: '50'
        }]
      });
    });

    router.add('/products/:id', 'get', function (opts, cb) {
      cb(null, {
        id: '1212112',
        title: '红酒',
        intro: '介绍',
        content: '内容',
        prict: '100',
        tb: '50'
      });
    });
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