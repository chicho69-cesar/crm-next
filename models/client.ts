import { Schema, Model, model, models } from 'mongoose'
import { IClient } from '@/interfaces'

const clientsSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    trim: true
  },
  lastName: {
    type: String,
    required: [true, 'The last name is required'],
    trim: true
  },
  company: {
    type: String,
    required: [true, 'The company is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'The email is required'],
    trim: true,
    unique: true
  },
  phone: {
    type: String,
    trim: true
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
})

const Client: Model<IClient> = models.Client || model('Client', clientsSchema)

export default Client
