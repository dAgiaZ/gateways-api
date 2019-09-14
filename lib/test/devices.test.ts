process.env.NODE_ENV = 'test'

import * as mongoose from 'mongoose'
import { DeviceSchema } from '../models/device.model'
import * as server from '../server'
import 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
chai.use(chaiHttp)
const Device = mongoose.model('Device', DeviceSchema)

/**
 * Data examples
 */
const goodDataset = {
  uid: '123456',
  vendor: 'Device 0',
  online: true
}

const noUIDDataset = {
  vendor: 'Device 0',
  online: true
}

const noVendorDataset = {
  uid: '123456',
  online: true
}


//Principal block
describe('Devices', () => {

 
  beforeEach((done) => {
    Device.collection.deleteMany({}, done())
  });
  afterEach((done) => {
    Device.collection.deleteMany({}, done())
    
  });

  /*
  * Test the /GET route
  */
  describe('/GET devices', () => {
      it('it should GET all the devices', (done) => {
        chai.request(server)
            .get('/devices')
            .then( (res: any) => {
              chai.expect(res.status).to.eql(200)
              chai.expect(res.body).to.be.a('array')
              chai.expect(res.body.length).to.gte(0)
              done()
            })
      })

      //Sucefully get one device
      it('GET an existing device', (done) => {
        let device = new Device(goodDataset)
        device
          .save()
          .then( (device: any) => {
            chai.request(server)
            .get(`/devices/${device._id}`)
            .then( (res: any) => {
              chai.expect(res.status).to.eql(200)
              chai.expect(res.body).to.be.a('object')
              chai.expect(res.body._id).to.eql(String(device._id))
              done()
            })
          })

      })
  }).timeout(8000)


  /*
  * Test the /POST route
  */
  describe('/POST devices', () => {
    //Sucefully insertion
    it('it should ADD a new device', (done) => {
        chai.request(server)
        .post('/devices')
        .send(goodDataset)
        .then( (res: any) => {
          chai.expect(res.status).to.eql(200)
          chai.expect(res.body).to.be.a('object')
          chai.expect(res.body._id.length).to.gt(0)
          done()
        })
    })

    //Failed insertion. No uid
    it('it should return error because of empty uid', (done) => {
      chai.request(server)
      .post('/devices')
      .send(noUIDDataset)
      .then( (res: any) => {
        chai.expect(res.status).to.eql(400)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body.message).to.eql('Device validation failed: uid: Enter uid number')
        done()
      })
    })

    //Failed insertion. No vendor
    it('it should return error because of empty vendor', (done) => {
      chai.request(server)
      .post('/devices')
      .send(noVendorDataset)
      .then( (res: any) => {
        chai.expect(res.status).to.eql(400)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body.message).to.eql('Device validation failed: vendor: Enter a name')
        done()
      })
    })

    //Failed insertion. Duplicated uid
    it('it should return error because of uid already exists', (done) => {
      let device = new Device(goodDataset)
      device
        .save()
        .then( (device: any) => {
          chai.request(server)
          .post('/devices')
          .send(goodDataset)
          .then( (res: any) => {
            chai.expect(res.status).to.eql(400)
            chai.expect(res.body).to.be.a('object')
            chai.expect(res.body.message).contains('already exists.')
            done()
          })
        })

    })    
    
  }).timeout(8000)

/*
  * Test the /PUT route
  */
 describe('/PUT devices/:deviceId', () => {
    
  //Sucefully updated
  it('it should update an existing device', (done) => {
    let device = new Device(goodDataset)
    device
      .save()
      .then( (device: any) => {
        chai.request(server)
        .put(`/devices/${device._id}`)
        .send({vendor: 'Device X'})
        .then( (res: any) => {
          chai.expect(res.status).to.eql(200)
          chai.expect(res.body).to.be.a('object')
          chai.expect(res.body.vendor).to.eql('Device X')
          done()
        })
      })

  })

  //Failed update. Updating with a duplicated uid
  it('it should return error because of duplicated uid', (done) => {
    let device = new Device(goodDataset)
    device
      .save()
      .then( () => {
        let device1 = new Device({uid: '99999', vendor: 'Second Device'})
        device1
          .save()
          .then( (device1: any) => {
            chai.request(server)
            .put(`/devices/${device1._id}`)
            .send(goodDataset)
            .then( (res: any) => {
              chai.expect(res.status).to.eql(400)
              chai.expect(res.body).to.be.a('object')
              chai.expect(res.body.errmsg).contains('duplicate key error collection')
              done()
            })
          })
      } )

  })

}).timeout(8000)


/*
  * Test the /DELETE route
  */
 describe('/DELETE devices/:deviceId', () => {
    
  //Sucefully deleted
  it('it should delete an existing device', (done) => {
    let device = new Device(goodDataset)
    device
      .save()
      .then( (device: any) => {
        chai.request(server)
        .delete(`/devices/${device._id}`)
        .then( (res: any) => {
          chai.expect(res.status).to.eql(200)
          chai.expect(res.body).to.be.a('array')
          chai.expect(res.body.length).to.gte(0)
          done()
        })
      })

  })

}).timeout(8000)

  
}) //End of parent block