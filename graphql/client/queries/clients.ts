import { gql } from 'graphql-tag'

export const GET_CLIENTS = gql`
  query GetClients {
    getClients {
      id
      name
      lastName
      email
      company
      phone
      seller
    }
  }
`

export const GET_CLIENTS_SELLER = gql`
  query GetClientsSeller {
    getClientsSeller {
      id
      name
      lastName
      email
      company
      phone
      seller
    }
  }
`

export const GET_CLIENT = gql`
  query GetClient($getClientId: ID!) {
    getClient(id: $getClientId) {
      id
      name
      lastName
      email
      company
      phone
      seller
    }
  }
`
