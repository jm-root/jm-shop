import mongoose from 'mongoose'

let Schema = mongoose.Schema

let schemaDefine = {
  category: {type: Schema.Types.ObjectId, ref: 'category'}, // 关联分类id
  code: {type: String}, // 商品编码
  barcode: {type: String}, // 商品条形编码
  name: {type: String}, // 商品名字
  intro: {type: String}, // 简介
  content: {type: String}, // 商品描述
  score: {type: Number, default: 0}, // 赠送积分
  price: {type: Number, default: 0}, // 价格
  market_price: {type: Number}, // 市场价格, 原价, 显示价格
  promote_price: {type: Number}, // 促销价格
  promoteOpenTime: {type: Date}, // 促销开放时间
  promoteCloseTime: {type: Date}, // 促销结束时间
  tags: [{type: String}], // 商品标签
  thumb: {type: String}, // 缩略图
  img: {type: String}, // 图片
  originalImg: {type: String}, // 原图
  crtime: {type: Date, default: Date.now}, // 创建时间
  moditime: {type: Date, default: Date.now}, // 创建时间
  inventory: {type: Number, default: 0}, // 库存
  // limit: {type: Boolean, default: true}, //限量
  type: {type: Number, default: 0}, // 0 实物 1 虚拟
  status: {type: Number, default: 1}, // 0:关闭,1:开启
  attach: {type: Schema.Types.ObjectId}, // 关联物品id
  currency: {type: String, default: 'rmb'}, // 币种
  visible: {type: Number, default: 0} // 是否前端可见
}

export default function (schema) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}
