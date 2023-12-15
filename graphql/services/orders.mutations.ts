import { OrderData, type Order } from '@/interfaces'
import { client } from '../apollo-client'
import { OrderStatus } from '@/enums'
import { DELETE_ORDER, NEW_ORDER, UPDATE_ORDER } from '../client'

export async function newOrder(token: string, clientId: string, total: number, status: OrderStatus, order: OrderData[]) {
  const { data } = await client.mutate({
    mutation: NEW_ORDER,
    variables: {
      input: {
        client: clientId,
        total,
        order,
        status
      }
    },
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  const { newOrder } = data
  return newOrder as Order
}

export async function updateOrder(token: string, id: string, clientId: string, total: number, status: OrderStatus, order: OrderData[]) {
  const { data } = await client.mutate({
    mutation: UPDATE_ORDER,
    variables: {
      updateOrderId: id,
      input: {
        client: clientId,
        total,
        order,
        status
      }
    },
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  const { updateOrder } = data
  return updateOrder as Order
}

export async function deleteOrder(token: string, id: string) {
  await client.mutate({
    mutation: DELETE_ORDER,
    variables: {
      deleteOrderId: id
    },
    context: {
      headers: {
        Authorization: token
      }
    }
  })
}
