import { User } from '@/models'
import * as db from '@/config/db'
import { IUserLogged } from '@/interfaces'
import { isValidToken } from '@/utils'

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
