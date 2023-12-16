import { gql } from 'graphql-tag'

export const NEW_USER = gql`
  mutation NewUser($input: UserInput) {
    newUser(input: $input) {
      createdAt
      email
      id
      lastName
      name
    }
  }
`

export const UPDATE_USER = gql`
  mutation UpdateUser($updateUserId: ID!, $input: UserInput) {
    updateUser(id: $updateUserId, input: $input) {
      id
      name
      lastName
      email
      createdAt
    }
  }
`

export const DELETE_USER = gql`
  mutation DeleteUser($deleteUserId: ID!) {
    deleteUser(id: $deleteUserId)
  }
`

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`
