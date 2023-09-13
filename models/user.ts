import { Schema, Model, model, models } from 'mongoose'
import { IUser } from '@/interfaces';

const userSchema = new Schema({
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
  email: {
    type: String,
    required: [true, 'The email is required'],
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: [true, 'The password is required']
  }
}, {
  timestamps: true
})

const User: Model<IUser> = models.User || model('User', userSchema)

export default User
