import * as express from "express"
import * as cors from "cors"
import * as bodyParser from "body-parser"
import * as mongoose from 'mongoose'
import { GatewayRoutes } from "./routes/gateways.routes"
import { DeviceRoutes } from "./routes/devices.routes"
import { Database } from './config/database'

class App {
  public app: express.Application
  public gatewayRoutes: GatewayRoutes = new GatewayRoutes()
  public deviceRoutes: DeviceRoutes = new DeviceRoutes()

  //Mongodb config
  public mongoUrl: string = process.env.NODE_ENV === 'test' ? Database.testUrl : Database.url

  constructor() {
    this.app = express()
    this.config()  
    this.gatewayRoutes.routes(this.app)
    this.deviceRoutes.routes(this.app)
    this.mongoSetup()
  }

  private config(): void {
    //CORS enabled
    this.app.use(cors())
    // support application/json type post data
    this.app.use(bodyParser.json())
    //support application/x-www-form-urlencoded post data
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private mongoSetup(): void {
    mongoose.Promise = global.Promise
    mongoose.connect(this.mongoUrl, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
      useCreateIndex: true
    })
    .catch(error => console.log(error))
  }
}
export default new App().app