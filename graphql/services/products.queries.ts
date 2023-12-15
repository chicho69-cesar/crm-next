import { type Product } from '@/interfaces'
import { client } from '../apollo-client'
import { GET_PRODUCT, GET_PRODUCTS } from '../client'

export async function getProduct(id: string) {
  const { data } = await client.query({
    query: GET_PRODUCT,
    variables: {
      getProductId: id
    }
  })

  return data.getProduct as Product
}

export async function getProducts() {
  const { data } = await client.query({
    query: GET_PRODUCTS
  })

  return data.getProducts as Product[]
}
