import * as mongoose from 'mongoose'
import * as uniqueValidator from 'mongoose-unique-validator'

const Schema = mongoose.Schema

export const DeviceSchema = new Schema({
  uid: {
    type: Number,
    required: 'Enter uid number',
    unique: true
  },
  vendor: {
    type: String,
    required: 'Enter a name'
  },
  online: {
    type: Boolean,
    default: true
  },
  created_date: {
    type: Date,
    default: Date.now
  }
})

DeviceSchema.plugin(uniqueValidator, {message: props => `${props.value} already exists.`});
