/**
 * Created by Admin on 2016/5/13.
 */

'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// 夺宝列表
var schemaDefine = {
  id: { type: Number }, // 活动id
  product: { type: Schema.Types.ObjectId, ref: 'product' }, // 关联商品id
  prodNum: { type: Number, default: 1 }, // 每个活动捆绑多少个产品
  title: String, // 夺宝标题
  summary: String, // 夺宝简介
  period: { type: Number, default: 1 }, // 期数
  joinNumber: { type: Number, default: 0 }, // 参加人数
  winUserId: Schema.Types.ObjectId, // 中奖用户id
  winCode: Number, // 中奖编码
  totalTime: { type: Number }, // 最后35的前30条和最后一条的时间之和
  lastBetTimes: [{
    time: { type: String },
    number: { type: Number },
    nick: { type: String }
  }], // 最后35的前30条和最后一条的时间
  beginTime: { type: Date, default: Date.now }, // 开始时间
  modiTime: { type: Date, default: Date.now }, // 修改时间
  endTime: Date, // 结束时间
  openTime: Date, // 揭晓时间
  status: { type: Number, default: 1 }, // 状态 （1 进行中 2完成等待开奖 3开奖公布 4 未发货 5 已发货 6已完成）
  enable: { type: Boolean, default: false }, // 是否启用
  sort: { type: Number, default: 0 }, // 排序
  currency: { type: String, default: 'dbj' }, // 币种
  unitPrice: { type: Number, default: 1 }, // 单价
  totalPrice: Number, // 总价
  totalNumber: Number, // 总需要人数
  type: { type: Number, default: 1 }, // 连续1 或 限时2 开奖
  lotteryTime: Number, // 限时开奖时间
  maxPeriod: { type: Number, default: 1 }, // 最大期数
  logistics: { type: String }, // 物流公司
  lorder: { type: String // 物流单号
  } };

module.exports = function (schema, opts) {
  schema = schema || new Schema();
  schema.add(schemaDefine);
  return schema;
};