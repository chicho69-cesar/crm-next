import { Schema, Model, model, models } from 'mongoose'
import { IProduct } from '@/interfaces'

const productSchema = new Schema({
  name: {
    type: String,
    required: [true, 'The name is required'],
    trim: true
  },
  existence: {
    type: Number,
    required: [true, 'The existence is required']
  },
  price: {
    type: Number,
    required: [true, 'The price is required']
  }
}, {
  timestamps: true
})

productSchema.index({ name: 'text' })

const Product: Model<IProduct> = models.Product || model('Product', productSchema)

export default Product
