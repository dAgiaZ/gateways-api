import { Request, Response } from "express"
import { DeviceController } from '../controllers/device.controller'


export class DeviceRoutes {

  public deviceController: DeviceController = new DeviceController()

  public routes(app): void {

    // Devices
    app.route('/devices')

    // GET endpoint - Get all devices
    .get(this.deviceController.getDevices)

    // POST endpoint - Create new device
    .post(this.deviceController.addNewDevice)


    // Device detail
    app.route('/devices/:deviceId')

    // GET - Get a single device detail
    .get(this.deviceController.getDeviceWithId)

    //PUT - Update a device
    .put(this.deviceController.updateDevice)

    //DELETE - Delete a device
    .delete(this.deviceController.deleteDevice)

  }
}