/**
 * Created by Admin on 2016/5/13.
 */
var mongoose = require('mongoose')
var Schema = mongoose.Schema

// 用户地址
var schemaDefine = {
  userId: Schema.Types.ObjectId, // 用户id
  name: String, // 用户名字
  mobile: String, // 电话
  country: String, // 国家
  province: String, // 省
  city: String, // 市
  area: String, // 区
  address: String, // 详细地址
  email: String, // 邮箱
  crTime: {type: Date, default: Date.now}, // 创建时间
  modiTime: {type: Date, default: Date.now} // 更改时间
}

module.exports = function (schema, opts) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}
