import { type Client } from '@/interfaces'
import { client } from '../apollo-client'
import { GET_CLIENT, GET_CLIENTS, GET_CLIENTS_SELLER } from '../client'

export async function getClients(token: string) {
  const { data } = await client.query({
    query: GET_CLIENTS,
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return data.getClients as Client[]
}

export async function getClientsSeller(token: string) {
  const { data } = await client.query({
    query: GET_CLIENTS_SELLER,
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return data.getClientsSeller as Client[]
}

export async function getClient(token: string, id: string) {
  const { data } = await client.query({
    query: GET_CLIENT,
    variables: {
      getClientId: id
    },
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return data.getClient as Client
}
