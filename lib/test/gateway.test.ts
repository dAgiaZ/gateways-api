process.env.NODE_ENV = 'test'

import * as mongoose from 'mongoose'
import { GatewaySchema } from '../models/gateway.model'
import * as server from '../server'
import 'mocha'
import * as chai from 'chai'
import chaiHttp = require('chai-http')
chai.use(chaiHttp)
const Gateway = mongoose.model('Gateway', GatewaySchema)

/**
 * Data examples
 */
const goodDataset = {
  serialNumber: '123456',
  name: 'Gateway 0',
  ip: '192.168.1.1'
}

const noSNDataset = {
  name: 'Gateway 1',
  ip: '192.168.1.1'
}

const noNameDataset = {
  serialNumber: '12346554',
  ip: '192.168.1.1'
}

const noIPDataset = {
  serialNumber: '313213',
  name: 'Gateway 2'
}

const wrongIPDataset = {
  serialNumber: '123456',
  name: 'Gateway 0',
  ip: '19.12333.1.555'
}

//Principal block
describe('Gateways', () => {

 
  beforeEach((done) => {
    Gateway.collection.deleteMany({}, done())
  });
  afterEach((done) => {
    Gateway.collection.deleteMany({}, done())
    
  });

  /*
  * Test the /GET route
  */
  describe('/GET gateways', () => {
      it('it should GET all the gateways', (done) => {
        chai.request(server)
            .get('/gateways')
            .then( (res: any) => {
              chai.expect(res.status).to.eql(200)
              chai.expect(res.body).to.be.a('array')
              chai.expect(res.body.length).to.gte(0)
              done()
            })
      })

      //Sucefully updated
      it('GET an existing gateway', (done) => {
        let gateway = new Gateway(goodDataset)
        gateway
          .save()
          .then( (gateway: any) => {
            chai.request(server)
            .get(`/gateways/${gateway._id}`)
            .then( (res: any) => {
              chai.expect(res.status).to.eql(200)
              chai.expect(res.body).to.be.a('object')
              chai.expect(res.body._id).to.eql(String(gateway._id))
              done()
            })
          })

      })
  }).timeout(8000)


  /*
  * Test the /POST route
  */
  describe('/POST gateways', () => {
    //Sucefully insertion
    it('it should ADD a new gateway', (done) => {
        chai.request(server)
        .post('/gateways')
        .send(goodDataset)
        .then( (res: any) => {
          chai.expect(res.status).to.eql(200)
          chai.expect(res.body).to.be.a('object')
          chai.expect(res.body._id.length).to.gt(0)
          done()
        })
    })

    //Failed insertion. No serial number
    it('it should return error because of empty serial number', (done) => {
      chai.request(server)
      .post('/gateways')
      .send(noSNDataset)
      .then( (res: any) => {
        chai.expect(res.status).to.eql(400)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body.message).to.eql('Gateway validation failed: serialNumber: Enter serial number')
        done()
      })
    })

    //Failed insertion. No name
    it('it should return error because of empty name', (done) => {
      chai.request(server)
      .post('/gateways')
      .send(noNameDataset)
      .then( (res: any) => {
        chai.expect(res.status).to.eql(400)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body.message).to.eql('Gateway validation failed: name: Enter a name')
        done()
      })
    })

    //Failed insertion. No IP address
    it('it should return error because of empty IP address', (done) => {
      chai.request(server)
      .post('/gateways')
      .send(noIPDataset)
      .then( (res: any) => {
        chai.expect(res.status).to.eql(400)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body.message).to.eql('Gateway validation failed: ip: Enter a IPv4 address')
        done()
      })
    })

    //Failed insertion. Wrong IP address
    it('it should return error because of wrong IP address', (done) => {
      chai.request(server)
      .post('/gateways')
      .send(wrongIPDataset)
      .then( (res: any) => {
        chai.expect(res.status).to.eql(400)
        chai.expect(res.body).to.be.a('object')
        chai.expect(res.body.message).contains('is not a valid IP address.')
        done()
      })
    })
  }).timeout(8000)

/*
  * Test the /PUT route
  */
 describe('/PUT gateways/:gatewayId', () => {
    
  //Sucefully updated
  it('it should update an existing gateway', (done) => {
    let gateway = new Gateway(goodDataset)
    gateway
      .save()
      .then( (gateway: any) => {
        chai.request(server)
        .put(`/gateways/${gateway._id}`)
        .send({name: 'New Gateway'})
        .then( (res: any) => {
          chai.expect(res.status).to.eql(200)
          chai.expect(res.body).to.be.a('object')
          chai.expect(res.body.name).to.eql('New Gateway')
          done()
        })
      })

  })

  //Failed updated. Wrong IP address
  it('it should return error because of wrong IP address', (done) => {
    let gateway = new Gateway(goodDataset)
    gateway
      .save()
      .then( (gateway: any) => {
        chai.request(server)
        .put(`/gateways/${gateway._id}`)
        .send(wrongIPDataset)
        .then( (res: any) => {
          chai.expect(res.status).to.eql(400)
          chai.expect(res.body).to.be.a('object')
          chai.expect(res.body.message).contains('is not a valid IP address.')
          done()
        })
      })

  })


}).timeout(8000)


/*
  * Test the /DELETE route
  */
 describe('/DELETE gateways/:gatewayId', () => {
    
  //Sucefully deleted
  it('it should delete an existing gateway', (done) => {
    let gateway = new Gateway(goodDataset)
    gateway
      .save()
      .then( (gateway: any) => {
        chai.request(server)
        .delete(`/gateways/${gateway._id}`)
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