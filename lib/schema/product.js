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

var schemaDefine = {
  category: { type: Schema.Types.ObjectId, ref: 'category' }, // 关联分类id
  name: String, // 商品名字
  description: String, // 商品描述
  price: Number, // 进货价格
  tags: [String], // 商品标签数据
  pic: String, // 商品图片
  crTime: { type: Date, default: Date.now }, // 创建时间
  modiTime: { type: Date, default: Date.now }, // 创建时间
  inventory: { type: Number, default: 0 }, // 库存
  // limit: {type: Boolean, default: true}, //限量
  type: { type: Number, default: 1 }, // 1 实物 2 虚拟
  status: { type: Number, default: 1 }, // 0:关闭,1:开启
  attach: { type: Schema.Types.ObjectId }, // 关联物品id
  currency: { type: String, default: 'dbj' }, // 币种
  unitPrice: { type: Number, default: 1 }, // 单价
  visible: { type: Number, default: 0 // 是否前端可见
  } };

module.exports = exports['default'];