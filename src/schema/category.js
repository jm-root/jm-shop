import mongoose from 'mongoose'

let Schema = mongoose.Schema

// 分类
let schemaDefine = {
  code: {type: Number, unique: true}, // 000 xxx 商品编码6位 每级3位
  name: {type: String}, // 商品名称
  parent: {type: Schema.Types.ObjectId, ref: 'category'},
  crTime: {type: Date, default: Date.now} // 创建时间
}

export default function (schema) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}
