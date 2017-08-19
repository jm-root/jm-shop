'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var opts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var db = opts.db;

  var o = {
    ready: false,
    t: _locale2.default,

    onReady: function onReady() {
      var self = this;
      return new _bluebird2.default(function (resolve, reject) {
        if (self.ready) return resolve(self.ready);
        self.on('ready', function () {
          resolve();
        });
      });
    }

  };
  _jmEvent2.default.enableEvent(o);

  var cb = function cb(db) {
    opts.db = db;
    o.sq = _jmDao2.default.sequence({ db: db });
    o.product = require('./product')(o, opts);
    o.ready = true;
    o.emit('ready');
  };

  if (!db) {
    db = _jmDao2.default.db.connect().then(cb);
  } else if (typeof db === 'string') {
    db = _jmDao2.default.db.connect(db).then(cb);
  }

  return o;
};

var _jmDao = require('jm-dao');

var _jmDao2 = _interopRequireDefault(_jmDao);

var _jmEvent = require('jm-event');

var _jmEvent2 = _interopRequireDefault(_jmEvent);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

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