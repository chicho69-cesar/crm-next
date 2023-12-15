import { type Order } from '@/interfaces'
import { client } from '../apollo-client'
import { GET_ORDER, GET_ORDERS, GET_ORDERS_SELLER, GET_ORDERS_STATUS } from '../client'
import { OrderStatus } from '@/enums'

export async function getOrders(token: string) {
  const { data } = await client.query({
    query: GET_ORDERS,
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return data.getOrders as Order[]
}

export async function getOrdersSeller(token: string) {
  const { data } = await client.query({
    query: GET_ORDERS_SELLER,
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return data.getOrdersSeller as Order[]
}

export async function getOrder(token: string, id: string) {
  const { data } = await client.query({
    query: GET_ORDER,
    variables: {
      getOrderId: id
    },
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return data.getOrder as Order
}

export async function getOrdersByStatus(token: string, status: OrderStatus) {
  const { data } = await client.query({
    query: GET_ORDERS_STATUS,
    variables: {
      status
    },
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return data.getOrdersStatus as Order[]
}
