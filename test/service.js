import chai from 'chai'

let expect = chai.expect
import config from '../config'
import $ from '../src'

let service = $(config)
let router = service.router()

let shop = {
  account: 'jeff',
  password: '123',
  mobile: '13600000000',
  email: 'jeff@jamma.cn',
  nick: 'jeff'
}

let log = (err, doc) => {
  err && console.error(err.stack)
}

let init = function () {
  return new Promise(function (resolve, reject) {
    service.onReady().then(() => {
      resolve()
    })
  })
}

describe('service', function () {
  it('create product', function (done) {
    init().then(function () {
      service.product.create({
        name: 'test',
        price: 100
      }, function (err, doc) {
        log(err, doc)
        expect(err === null).to.be.ok
        done()
      })
    })
  })

  it('create order', function (done) {
    init().then(function () {
      service.order.create({
        products: [
          {
            product: '59a7bc62df70981220d5093f',
            quantity: 1
          }
        ]
      }, function (err, doc) {
        log(err, doc)
        expect(err === null).to.be.ok
        done()
      })
    })
  })

})
