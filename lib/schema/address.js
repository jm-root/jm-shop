'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (schema) {
  schema = schema || new Schema();
  schema.add(schemaDefine);
  return schema;
};

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Schema = _mongoose2.default.Schema;

// 用户地址
var schemaDefine = {
  user: { type: Schema.Types.ObjectId, ref: 'user' },
  name: String, // 用户名字
  mobile: String, // 电话
  country: String, // 国家
  province: String, // 省
  city: String, // 市
  area: String, // 区
  address: String, // 详细地址
  email: String, // 邮箱
  crTime: { type: Date, default: Date.now }, // 创建时间
  modiTime: { type: Date, default: Date.now // 更改时间
  } };

module.exports = exports['default'];