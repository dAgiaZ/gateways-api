import * as mongoose from 'mongoose'
import { DeviceSchema } from '../models/device.model'
import { Request, Response } from 'express'

const Device = mongoose.model('Device', DeviceSchema)

export class DeviceController {

  public addNewDevice(req: Request, res: Response) {
    let newDevice = new Device(req.body)
    newDevice.save()
    .then( device => res.json(device) )
    .catch( err => res.status(400).send(err) )
  }

  public getDevices(req: Request, res: Response) {
    Device.find({})
    .then( devices => res.json(devices) )
    .catch( err => res.status(400).send(err) )
  }

  public getDeviceWithId(req: Request, res: Response) {
    Device.findById(req.params.deviceId)
    .then( device => res.json(device) )
    .catch( err => res.status(400).send(err))
  }

  public updateDevice(req: Request, res: Response) {
    Device.findOneAndUpdate({ _id: req.params.deviceId }, req.body, { new: true })
    .then( device => res.json(device) )
    .catch( err => res.status(400).send(err) )
  }

  public deleteDevice(req: Request, res: Response) {
    Device.deleteOne({ _id: req.params.deviceId })
    .then( () => {
      Device.find({})
      .then( devices => res.json(devices) )
      .catch( err => res.status(400).send(err) )
    } )
    .catch( err => res.status(400).send(err) )
  }


}
