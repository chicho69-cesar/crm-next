import { gql } from 'graphql-tag'

export const GET_ORDERS = gql`
  query GetOrders {
    getOrders {
      id
      order {
        id
        name
        price
        quantity
      }
      client {
        id
        name
        lastName
        email
        company
        phone
        seller
      }
      seller
      status
      total
      date
    }
  }
`

export const GET_ORDERS_SELLER = gql`
  query GetOrdersSeller {
    getOrdersSeller {
      id
      order {
        id
        name
        price
        quantity
      }
      client {
        id
        name
        lastName
        email
        company
        phone
        seller
      }
      seller
      total
      status
      date
    }
  }
`

export const GET_ORDER = gql`
  query GetOrder($getOrderId: ID!) {
    getOrder(id: $getOrderId) {
      id
      order {
        id
        price
        name
        quantity
      }
      client {
        id
        name
        lastName
        email
        company
        phone
        seller
      }
      seller
      status
      total
      date
    }
  }
`

export const GET_ORDERS_STATUS = gql`
  query GetOrdersStatus($status: OrderStatus!) {
    getOrdersStatus(status: $status) {
      id
      order {
        id
        name
        price
        quantity
      }
      client {
        id
        name
        lastName
        email
        company
        phone
        seller
      }
      seller
      status
      total
      date
    }
  }
`
