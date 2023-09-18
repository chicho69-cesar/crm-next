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

export const AUTHENTICATE_USER = gql`
  mutation AuthenticateUser($input: AuthenticateInput) {
    authenticateUser(input: $input) {
      token
    }
  }
`
