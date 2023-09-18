import { gql } from 'graphql-tag'

export const TEST = gql`
  mutation Test($message: String) {
    test(message: $message)
  }
`
