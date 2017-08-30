import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 用户地址
let schemaDefine = {
  user: {type: Schema.Types.ObjectId, ref: 'user'},
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

export default function (schema) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}
