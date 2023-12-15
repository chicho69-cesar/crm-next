import { type Product } from '@/interfaces'
import { client } from '../apollo-client'
import { DELETE_PRODUCT, NEW_PRODUCT, UPDATE_PRODUCT } from '../client'

export async function newProduct(name: string, existence: number, price: number) {
  const { data } = await client.mutate({
    mutation: NEW_PRODUCT,
    variables: {
      input: {
        name,
        existence,
        price
      }
    }
  })

  const { newProduct } = data
  return newProduct as Product
}

export async function updateProduct(id: string, name: string, existence: number, price: number) {
  const { data } = await client.mutate({
    mutation: UPDATE_PRODUCT,
    variables: {
      updateProductId: id,
      input: {
        name,
        existence,
        price
      }
    }
  })

  const { updateProduct } = data
  return updateProduct as Product
}

export async function deleteProduct(id: string) {
  await client.mutate({
    mutation: DELETE_PRODUCT,
    variables: {
      deleteProductId: id
    }
  })
}
