import type { Product, TopClients, TopSellers } from '@/interfaces'
import { client } from '../apollo-client'
import { GET_TOP_CLIENTS, GET_TOP_SELLERS, SEARCH_PRODUCT } from '../client'

export async function topClients() {
  const { data } = await client.query({
    query: GET_TOP_CLIENTS
  })

  return data.topClients as TopClients[]
}

export async function topSellers() {
  const { data } = await client.query({
    query: GET_TOP_SELLERS
  })

  return data.topSellers as TopSellers[]
}

export async function searchProduct(search: string) {
  const { data } = await client.query({
    query: SEARCH_PRODUCT,
    variables: {
      text: search
    }
  })

  return data.searchProduct as Product[]
}
