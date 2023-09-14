import bcrypt from 'bcryptjs'

import { User } from '@/models'
import * as db from '@/config/db'
import { IUserLogged } from '@/interfaces'
import { isValidToken, signToken } from '@/utils'

export async function getLoggedUser(token: string): Promise<IUserLogged | null> {
  if (!token) {
    return null
  }

  try {
    const userId = await isValidToken(token.replace('Bearer ', '').trim())

    await db.connect()
    const user = await User.findById(userId).lean()
    await db.disconnect()

    if (!user) {
      return null
    }

    const { _id: id, name, email } = user

    return {
      _id: id,
      name,
      email,
    }
  } catch (error) {
    console.log(error)
    await db.disconnect()

    return null
  }
}

// ... THE REST OF QUERIES

// ... MUTATIONS

export async function newUser(
  name: string,
  lastName: string,
  email: string,
  password: string
) {
  await db.connect()

  const userExists = await User.findOne({ email }).lean()
  if (userExists) throw new Error('User is already registered')

  const salt = await bcrypt.genSalt(10)
  const hashedPassword = await bcrypt.hash(password, salt)

  try {
    const user = new User({
      name,
      lastName,
      email,
      password: hashedPassword,
    })

    await user.save()
    await db.disconnect()

    return user
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error('Error creating the user')
  }
}

export async function authenticateUser(email: string, password: string) {
  await db.connect()
  const userExists = await User.findOne({ email }).lean()
  await db.disconnect()

  if (!userExists) throw new Error('User not found')

  const isCorrectPassword = await bcrypt.compare(password, userExists.password)
  if (!isCorrectPassword) throw new Error('The password is incorrect')

  return signToken(userExists._id, userExists.email)
}