/**
 * Created by Admin on 2016/5/13.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 商品列表(虚拟）
var schemaDefine = {
  product: { type: Schema.Types.ObjectId, ref: 'product' }, // 关联产品id
  buyNum: { type: Number, default: 1 }, // 购买多少个商品
  buyUserId: Schema.Types.ObjectId, // 购买用户id
  modiTime: { type: Date, default: Date.now }, // 修改时间
  crTime: { type: Date, default: Date.now }, // 创建时间
  status: { type: Number, default: 1 }, // 状态 （1下订单 2支付 4已完成）
  // enable: {type:Boolean, default: true}, //是否启用
  payId: { type: Schema.Types.ObjectId // 支付id
  } };

module.exports = function (schema, opts) {
  schema = schema || new Schema();
  schema.add(schemaDefine);
  return schema;
};