import mongoose from 'mongoose'

let Schema = mongoose.Schema

let productSchema = new Schema({
  product: {type: Schema.Types.ObjectId, ref: 'product'}, // 关联产品id
  quantity: {type: Number, default: 1}, // 购买多少个商品
  price: {type: Number, default: 0} // 单价
})

// 订单
let schemaDefine = {
  products: [productSchema],
  user: {type: Schema.Types.ObjectId, ref: 'user'}, // 购买用户id
  address: {type: Schema.Types.ObjectId, ref: 'address'}, // 收货地址
  crtime: {type: Date, default: Date.now}, // 创建时间
  moditime: {type: Date, default: Date.now}, // 修改时间
  status: {type: Number, default: 1}, // 状态 （1未支付 2已支付 3已发货 4已完成 5取消中 6已取消）
  pay: {type: Schema.Types.ObjectId} // 支付id
}

export default function (schema) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}
