import { gql } from 'graphql-tag'

export const NEW_ORDER = gql`
  mutation NewOrder($input: OrderInput) {
    newOrder(input: $input) {
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
      date
      status
      total
      seller
    }
  }
`

export const UPDATE_ORDER = gql`
  mutation UpdateOrder($updateOrderId: ID!, $input: OrderInput) {
    updateOrder(id: $updateOrderId, input: $input) {
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

export const DELETE_ORDER = gql`
  mutation DeleteOrder($deleteOrderId: ID!) {
    deleteOrder(id: $deleteOrderId)
  }
`
