import { Schema, Model, model, models } from 'mongoose'
import { IOrder } from '@/interfaces'

const orderSchema = new Schema({
  order: {
    type: Array,
    required: [true, 'The order is required']
  },
  total: {
    type: Number,
    required: [true, 'The total is required']
  },
  client: {
    type: Schema.Types.ObjectId,
    ref: 'Client',
    required: [true, 'The client is required']
  },
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'The seller is required']
  },
  date: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: {
      values: ['PENDING', 'COMPLETED', 'CANCELED'],
      message: '{VALUE} is not a valid status',
      default: 'PENDING'
    }
  }
}, {
  timestamps: true
})

const Order: Model<IOrder> = models.Order || model('Order', orderSchema)

export default Order
