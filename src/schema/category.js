/**
 * Created by Admin on 2016/5/13.
 */

'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

// 分类
var schemaDefine = {
  code: {type: Number, unique: true }, // 000 xxx 商品编码6位 每级3位
  name: String, // 商品名称
  pid: {type: Schema.Types.ObjectId, ref: 'category'},
  crTime: {type: Date, default: Date.now} // 创建时间
}

module.exports = function (schema, opts) {
  schema = schema || new Schema()
  schema.add(schemaDefine)
  return schema
}
