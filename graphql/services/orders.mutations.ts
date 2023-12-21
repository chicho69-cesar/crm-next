import { OrderData, type Order } from '@/interfaces'
import { client } from '../apollo-client'
import { DELETE_ORDER, GET_ORDERS_SELLER, GET_PRODUCTS, GET_TOP_CLIENTS, GET_TOP_SELLERS, NEW_ORDER, UPDATE_ORDER, UPDATE_ORDER_STATUS } from '../client'

export async function newOrder(token: string, clientId: string, total: number, status: string, order: OrderData[]) {
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
    },
    refetchQueries: [
      { query: GET_TOP_CLIENTS },
      { query: GET_TOP_SELLERS },
      { query: GET_PRODUCTS },
      { query: GET_ORDERS_SELLER, context: { headers: { Authorization: token } } }
    ]
  })

  const { newOrder } = data
  return newOrder as Order
}

export async function updateOrder(token: string, id: string, clientId: string, total: number, status: string, order: OrderData[]) {
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
    },
    refetchQueries: [
      { query: GET_TOP_CLIENTS },
      { query: GET_TOP_SELLERS },
      { query: GET_PRODUCTS },
      { query: GET_ORDERS_SELLER, context: { headers: { Authorization: token } } }
    ]
  })

  const { updateOrder } = data
  return updateOrder as Order
}

export async function updateOrderStatus(token: string, id: string, status: string) {
  const { data } = await client.mutate({
    mutation: UPDATE_ORDER_STATUS,
    variables: {
      updateOrderStatusId: id,
      status
    },
    context: {
      headers: {
        Authorization: token
      }
    },
    refetchQueries: [
      { query: GET_TOP_CLIENTS },
      { query: GET_TOP_SELLERS },
      { query: GET_ORDERS_SELLER, context: { headers: { Authorization: token } } }
    ]
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
    },
    refetchQueries: [
      { query: GET_TOP_CLIENTS },
      { query: GET_TOP_SELLERS },
      { query: GET_PRODUCTS },
      { query: GET_ORDERS_SELLER, context: { headers: { Authorization: token } } }
    ]
  })
}
