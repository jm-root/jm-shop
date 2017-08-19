/**
 * Created by Admin on 2016/5/13.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// 购买列表
var schemaDefine = {
  userId: {type: Schema.Types.ObjectId}, // 用户id
  lottery: {type: Schema.Types.ObjectId, ref: 'lottery'}, // 关联夺宝id
  codeBegin: Number, // 购买产生的夺宝编码
  codeNum: Number, // 购买次数
  codes: [Number], // 购买的码
  modiTime: {type: Date, default: Date.now}, // 修改时间
  crTime: {type: Date, default: Date.now}, // 购买时间
  payId: {type: Schema.Types.ObjectId}, // 支付id
  status: {type: Number, default: 1} // 状态 （1下订单 2支付 3已完成）
}

module.exports = function (schema, opts) {
  schema = schema || new Schema()
  schema.add(schemaDefine)

  return schema
}
