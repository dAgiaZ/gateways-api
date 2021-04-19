import * as mongoose from 'mongoose'
import { GatewaySchema } from '../models/gateway.model'
import { Request, Response } from 'express'

const Gateway = mongoose.model('Gateway', GatewaySchema)

export class GatewayController {

  public async addNewGateway(req: Request, res: Response) {
    try {
      let newGateway = new Gateway(req.body)
      await newGateway.save()
      return res.json(newGateway)
    } catch (err) {
      return res.status(400).send(err) 
    }
  }

  public async getGateways(req: Request, res: Response) {
    try {
      const gateways = await Gateway.find({}).populate('devices')
      return res.json(gateways)
    } catch (err) {
      return res.status(400).send(err)
    }
  }

  public async getGatewayWithId(req: Request, res: Response) {
    try {
      const gateway = await Gateway.findById(req.params.gatewayId).populate('devices')
      return res.json(gateway)
    } catch (err) {
      return res.status(400).send(err)
    }
  }

  public async updateGateway(req: Request, res: Response) {
    try {
      const gateway = await Gateway.findOneAndUpdate({ _id: req.params.gatewayId }, req.body, { new: true, runValidators: true }).populate('devices')
      return res.json(gateway)
    } catch (err) {
      return res.status(400).send(err)
    }
  }

  public async deleteGateway(req: Request, res: Response) {
    try {
      await Gateway.deleteOne({ _id: req.params.gatewayId })
      const gateways = await Gateway.find({}).populate('devices')
      return res.json(gateways)
    } catch (err) {
      return res.status(400).send(err)
    }
  }

}
