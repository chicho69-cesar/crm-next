import { client } from '@/graphql/apollo-client'
import { GET_USER } from '@/graphql/client'
import { type User } from '@/interfaces'

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
