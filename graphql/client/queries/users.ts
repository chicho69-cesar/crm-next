import { gql } from 'graphql-tag'

export const GET_USER = gql`
  query ExampleQuery {
    getUser {
      id
      name
      lastName
      email
    }
  }
`
