import * as mongoose from 'mongoose'

const Schema = mongoose.Schema

export const GatewaySchema = new Schema({
  serialNumber: {
    type: String,
    required: 'Enter serial number'
  },
  name: {
    type: String,
    required: 'Enter a name'
  },
  ip: {
    type: String,
    required: 'Enter a IPv4 address',
    validate: {
      validator: (value) => {
        return /^(?:(25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])(\.(?!$)|$)){4}$/.test(value)
      },
      message: props => `${props.value} is not a valid IP address.`
    }
  },
  devices: {
    type: [{
      type: Schema.Types.ObjectId, 
      ref: 'Device'
    }],
    validate: [(value) => !value || (value.length <= 10), 'You exceeds the limit of 10 devices']
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})