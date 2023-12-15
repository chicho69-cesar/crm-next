import { type User } from '@/interfaces'
import { client } from '../apollo-client'
import { AUTHENTICATE_USER, NEW_USER } from '../client'

export async function newUser(name: string, lastName: string, email: string, password: string) {
  const { data } = await client.mutate({
    mutation: NEW_USER,
    variables: {
      input: {
        name,
        lastName,
        email,
        password
      }
    }
  })

  const { newUser } = data
  return newUser as User
}

export async function authenticateUser(email: string, password: string) {
  const { data } = await client.mutate({
    mutation: AUTHENTICATE_USER,
    variables: {
      input: {
        email,
        password
      }
    }
  })

  const { authenticateUser: { token } } = data
  return token as string
}
