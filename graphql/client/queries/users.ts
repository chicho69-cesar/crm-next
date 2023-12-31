import { gql } from 'graphql-tag'

export const GET_USER = gql`
  query GetUser {
    getUser {
      id
      name
      lastName
      email
    }
  }
`

export const GET_USER_BY_ID = gql`
  query GetUserById($getUserByIdId: ID!) {
    getUserById(id: $getUserByIdId) {
      id
      name
      lastName
      email
    }
  }
`

export const GET_USERS = gql`
  query GetUsers {
    getUsers {
      id
      name
      lastName
      email
    }
  }
`
