import { type Client } from '@/interfaces'
import { client } from '../apollo-client'
import { DELETE_CLIENT, GET_CLIENTS, GET_CLIENTS_SELLER, GET_TOP_CLIENTS, NEW_CLIENT, UPDATE_CLIENT } from '../client'

export async function newClient(token: string, name: string, lastName: string, company: string, email: string, phone: string) {
  const { data } = await client.mutate({
    mutation: NEW_CLIENT,
    variables: {
      input: {
        name,
        lastName,
        company,
        email,
        phone
      }
    },
    context: {
      headers: {
        Authorization: token
      }
    },
    refetchQueries: [
      { query: GET_CLIENTS, context: { headers: { Authorization: token } } },
      { query: GET_CLIENTS_SELLER, context: { headers: { Authorization: token } } },
      { query: GET_TOP_CLIENTS }
    ]
  })

  const { newClient } = data
  return newClient as Client
}

export async function updateClient(token: string, id: string, name: string, lastName: string, company: string, email: string, phone: string) {
  const { data } = await client.mutate({
    mutation: UPDATE_CLIENT,
    variables: {
      updateClientId: id,
      input: {
        name,
        lastName,
        company,
        email,
        phone
      }
    },
    context: {
      headers: {
        Authorization: token
      }
    },
    refetchQueries: [
      { query: GET_CLIENTS, context: { headers: { Authorization: token } } },
      { query: GET_CLIENTS_SELLER, context: { headers: { Authorization: token } } },
      { query: GET_TOP_CLIENTS }
    ]
  })

  const { updateClient } = data
  return updateClient as Client
}

export async function deleteClient(token: string, id: string) {
  await client.mutate({
    mutation: DELETE_CLIENT,
    variables: {
      deleteClientId: id
    },
    context: {
      headers: {
        Authorization: token
      }
    },
    refetchQueries: [
      { query: GET_CLIENTS, context: { headers: { Authorization: token } } },
      { query: GET_CLIENTS_SELLER, context: { headers: { Authorization: token } } },
      { query: GET_TOP_CLIENTS }
    ]
  })
}
