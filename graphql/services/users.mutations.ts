import { type User } from '@/interfaces'
import { client } from '../apollo-client'
import { AUTHENTICATE_USER, DELETE_USER, GET_TOP_SELLERS, GET_USERS, NEW_USER, UPDATE_USER } from '../client'

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
    },
    refetchQueries: [
      { query: GET_USERS },
      { query: GET_TOP_SELLERS }
    ]
  })

  const { newUser } = data
  return newUser as User
}

export async function updateUser(id: string, name: string, lastName: string, email: string, password: string) {
  const { data } = await client.mutate({
    mutation: UPDATE_USER,
    variables: {
      updateUserId: id,
      input: {
        name,
        lastName,
        email,
        password
      }
    },
    refetchQueries: [
      { query: GET_USERS },
      { query: GET_TOP_SELLERS }
    ]
  })

  const { updateUser } = data
  return updateUser as User
}

export async function deleteUser(id: string) {
  await client.mutate({
    mutation: DELETE_USER,
    variables: {
      deleteUserId: id
    },
    refetchQueries: [
      { query: GET_USERS },
      { query: GET_TOP_SELLERS }
    ]
  })
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
