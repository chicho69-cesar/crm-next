import { type User } from '@/interfaces'
import { client } from '../apollo-client'
import { GET_USER } from '../client'

export async function getUser(token: string) {
  const { data } = await client.query({
    query: GET_USER,
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return data.getUser as User
}
