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

// 分类
var schemaDefine = {
  code: { type: Number, unique: true }, // 000 xxx 商品编码6位 每级3位
  name: { type: String }, // 商品名称
  parent: { type: Schema.Types.ObjectId, ref: 'category' },
  crTime: { type: Date, default: Date.now // 创建时间
  } };

module.exports = exports['default'];