import * as mongoose from 'mongoose'
import { GatewaySchema } from '../models/gateway.model'
import { Request, Response } from 'express'

const Gateway = mongoose.model('Gateway', GatewaySchema)

export class GatewayController {

  addNewGateway(req: Request, res: Response): void {
    let newGateway = new Gateway(req.body)
    newGateway.save()
    .then( gateway => res.json(gateway) )
    .catch( err => res.status(400).send(err) )
  }

  getGateways(req: Request, res: Response): void {
    Gateway.find({}).populate('devices')
    .then( gateways => res.json(gateways) )
    .catch( err => res.status(400).send(err) )
  }

  getGatewayWithId(req: Request, res: Response): void {
    Gateway.findById(req.params.gatewayId).populate('devices')
    .then( gateway => res.json(gateway) )
    .catch( err => res.status(400).send(err) )
  }

  updateGateway(req: Request, res: Response): void {
    Gateway.findOneAndUpdate({ _id: req.params.gatewayId }, req.body, { new: true, runValidators: true }).populate('devices')
    .then( gateway => res.json(gateway) )
    .catch( err => res.status(400).send(err)  )
  }

  deleteGateway(req: Request, res: Response): void {
    Gateway.deleteOne({ _id: req.params.gatewayId })
    .then( () => {
      Gateway.find({}).populate('devices')
      .then( gateways => res.json(gateways) )
      .catch( err => res.status(400).send(err) )
    } )
    .catch( err => res.status(400).send(err)  )
  }

}
