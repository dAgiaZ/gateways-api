import * as mongoose from 'mongoose'
import { DeviceSchema } from '../models/device.model'
import { Request, Response } from 'express'

const Device = mongoose.model('Device', DeviceSchema)

export class DeviceController {

  public async addNewDevice(req: Request, res: Response) {
    try {
      let newDevice = new Device(req.body)
      await newDevice.save()
      return res.json(newDevice)
    } catch (err) {
      return res.status(400).send(err) 
    }
  }

  public async getDevices(req: Request, res: Response) {
    try {
      const devices = await Device.find({})
      return res.json(devices)
    } catch (err) {
      return res.status(400).send(err)
    }
  }

  public async getDeviceWithId(req: Request, res: Response) {
    try {
      const device = await Device.findById(req.params.deviceId)
      return res.json(device)
    } catch (err) {
      return res.status(400).send(err)
    }
  }

  public async updateDevice(req: Request, res: Response) {
    try {
      const device = await Device.findOneAndUpdate({ _id: req.params.deviceId }, req.body, { new: true })
      return res.json(device)
    } catch (err) {
      return res.status(400).send(err)
    }
  }

  public async deleteDevice(req: Request, res: Response) {
    try {
      await Device.deleteOne({ _id: req.params.deviceId })
      const devices = await Device.find({})
      return res.json(devices)
    } catch (err) {
      return res.status(400).send(err)
    }
  }

}
