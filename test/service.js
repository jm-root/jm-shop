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
      resolve(service.shop.findOneAndRemove({account: shop.account}))
    })
  })
}

let prepare = function () {
  return init().then(function () {
    return service.signup(shop)
  })
}

describe('service', function () {
  it('t', function (done) {
    let o = service.t('Create Uid Fail', 'zh_CN')
    expect(o === '生成UID失败').to.be.ok
    done()
  })

  it('password', function (done) {
    let o = service.encryptPassword('123')
    expect(service.checkPassword(o, '123')).to.be.ok
    done()
  })

  it('create shop', function (done) {
    init().then(function () {
      service.shop.create(shop, function (err, doc) {
        log(err, doc)
        expect(err === null).to.be.ok
        service.shop.create(shop, function (err, doc) {
          log(err, doc)
          expect(err !== null).to.be.ok
          done()
        })
      })
    })
  })

  it('signup cb', function (done) {
    init().then(function () {
      service.signup(shop, function (err, doc) {
        log(err, doc)
        expect(err === null).to.be.ok
        done()
      })
    })
  })

  it('signup', function (done) {
    init().then(function () {
      service.signup(shop)
        .then(function (doc) {
          expect(doc !== null).to.be.ok
          return service.signup(shop)
        })
        .catch(function (err) {
          log(err)
          expect(err !== null).to.be.ok
          done()
        })
    })
  })

  it('findUser account', function (done) {
    prepare().then(function () {
      service.findUser(shop.account, function (err, doc) {
        log(err, doc)
        expect(doc.account === shop.account).to.be.ok
        service.findUser(doc.uid, function (err, doc) {
          log(err, doc)
          expect(doc.account === shop.account).to.be.ok
          service.findUser(doc.id, function (err, doc) {
            log(err, doc)
            expect(doc.account === shop.account).to.be.ok
            done()
          })
        })
      })
    })
  })

  it('findUser email', function (done) {
    prepare().then(function () {
      service.findUser(shop.email, function (err, doc) {
        log(err, doc)
        expect(doc.account === shop.account).to.be.ok
        done()
      })
    })
  })

  it('findUser mobile', function (done) {
    prepare().then(function () {
      service.findUser(shop.mobile, function (err, doc) {
        log(err, doc)
        expect(doc.account === shop.account).to.be.ok
        done()
      })
    })
  })

  it('updateUser cb', function (done) {
    prepare().then(function () {
      service.findUser(shop.account, function (err, doc) {
        log(err, doc)
        expect(doc.account === shop.account).to.be.ok
        service.updateUser(doc.id, {password: '123', gender: 'man'}, function (err, doc) {
          log(err, doc)
          expect(!err && doc).to.be.ok
          done()
        })
      })
    })
  })

  it('updateUser', function (done) {
    prepare().then(function () {
      service.findUser(shop.account, function (err, doc) {
        log(err, doc)
        expect(doc.account === shop.account).to.be.ok
        service.updateUser(doc.id, {password: '123', gender: 'man'})
          .then(function (doc) {
            expect(doc).to.be.ok
            done()
          })
      })
    })
  })

  it('updateUserExt', function (done) {
    prepare().then(function () {
      service.findUser(shop.account, function (err, doc) {
        log(err, doc)
        expect(doc.account === shop.account).to.be.ok
        service.updateUserExt(doc.id, {title: 'engineer'}, function (err, doc) {
          log(err, doc)
          expect(err === null).to.be.ok
          done()
        })
      })
    })
  })

  it('updatePassword', function (done) {
    prepare().then(function () {
      service.findUser(shop.account, function (err, doc) {
        log(err, doc)
        expect(doc.account === shop.account).to.be.ok
        let id = doc.id
        service.updateUser(doc.id, {password: '123'}, function (err, doc) {
          log(err, doc)
          expect(err === null).to.be.ok
          service.updatePassword(id, shop.password, '1234', function (err, doc) {
            log(err, doc)
            expect(doc && !doc.err).to.be.ok
            service.signon(shop.account, '1234', function (err, doc) {
              log(err, doc)
              expect(doc && doc.id !== null).to.be.ok
              done()
            })
          })
        })
      })
    })
  })

  it('signon', function (done) {
    prepare().then(function () {
      service.findUser(shop.account)
        .then(function (doc) {
          return service.updateUser(doc.id, {password: '123'})
        })
        .then(function (doc) {
          return service.signon(shop.account, shop.password)
        })
        .then(function (doc) {
          expect(doc && doc.id).to.be.ok
          done()
        })
        .catch(function (err) {
          log(err)
        })
    })
  })

  it('signon cb', function (done) {
    prepare().then(function () {
      service.findUser(shop.account)
        .then(function (doc) {
          return service.updateUser(doc.id, {password: '123'})
        })
        .then(function (doc) {
          service.signon(shop.account, shop.password, function (err, doc) {
            log(err, doc)
            expect(doc && doc.id).to.be.ok
            done()
          })
        })
        .catch(function (err) {
          log(err)
        })
    })
  })

  it('avatar save', function (done) {
    prepare().then(function () {
      service.avatar
        .save('123', 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAeCAMAAACMnWmDAAAAGFBMVEUAAABQUFAAAAAAAAAAAAAAAAAAAAAAAABiRp8mAAAACHRSTlMA/wAAAAAAACXRGJEAAAmJSURBVHjaAX4JgfYAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEAAAAAAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAABAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEAAAAAAAAAAAAAAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAEBAQEBAQEBAQEAAQEBAQEAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQAAAAAAAAAAAQEBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAQEBAQEBAQEBAQEAAQEBAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAABAQEAAAAAAAAAAAAAAQEAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAQEAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAABAQAAAAAAAAAAAAAAAQEAAAAAAAAAAAABAQAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAEBAQAAAAAAAAAAAAAAAQEBAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAEBAAEBAQEBAAAAAAAAAAEBAQAAAAABAQEAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAEBAQEBAQEBAQEAAAAAAAABAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAAAAQEAAAAAAAAAAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAAAAAAAAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEAAAAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQAAAAEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQEBAQEBAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQEBAQEBAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADFAgGM9lrxNwAAAABJRU5ErkJggg==')
        .then(function (doc) {
          expect(doc).to.be.ok
          console.log(service.avatar.get('123'))
          done()
        })
    })
  })

  it('router', function (done) {
    prepare().then(function () {
      router.get('/', {rows: 2}, function (err, doc) {
        expect(doc && doc.page).to.be.ok
        done()
      })
    })
  })
})
