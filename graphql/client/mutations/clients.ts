import { gql } from 'graphql-tag'

export const NEW_CLIENT = gql`
  mutation NewClient($input: ClientInput) {
    newClient(input: $input) {
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

export const UPDATE_CLIENT = gql`
  mutation UpdateClient($updateClientId: ID!, $input: ClientInput) {
    updateClient(id: $updateClientId, input: $input) {
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

export const DELETE_CLIENT = gql`
  mutation DeleteClient($deleteClientId: ID!) {
    deleteClient(id: $deleteClientId)
  }
`
