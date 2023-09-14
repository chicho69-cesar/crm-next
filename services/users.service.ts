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

// newUser

export async function authenticateUser(
  email: string,
  password: string
): Promise<string> {
  await db.connect()
  const userExists = await User.findOne({ email })
  await db.disconnect()

  if (!userExists) throw new Error('User not found')

  const isCorrectPassword = await bcrypt.compare(password, userExists.password)
  if (!isCorrectPassword) throw new Error('The password is incorrect')

  return signToken(userExists._id, userExists.email)
}
