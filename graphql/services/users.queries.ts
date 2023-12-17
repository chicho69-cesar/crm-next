import { type User } from '@/interfaces'
import { client } from '../apollo-client'
import { GET_USER, GET_USERS, GET_USER_BY_ID } from '../client'

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

export async function getUserById(id: string) {
  const { data } = await client.query({
    query: GET_USER_BY_ID,
    variables: {
      getUserByIdId: id
    }
  })

  return data.getUser as User
}

export async function getUsers() {
  const { data } = await client.query({
    query: GET_USERS
  })

  return data.getUsers as User[]
}
