import { GatewayController } from '../controllers/gateway.controller'

export class GatewayRoutes {

  public gatewayController: GatewayController = new GatewayController()

  public routes(app): void {

    // Gateways
    app.route('/gateways')

    // GET endpoint - Get all gateways
    .get(this.gatewayController.getGateways)

    // POST endpoint - Create new gateway
    .post(this.gatewayController.addNewGateway)


    // Gateway detail
    app.route('/gateways/:gatewayId')

    // GET - Get a single gateway detail
    .get(this.gatewayController.getGatewayWithId)

    //PUT - Update a gateway
    .put(this.gatewayController.updateGateway)

    //DELETE - Delete a gateway
    .delete(this.gatewayController.deleteGateway)

  }
}
