import { gql } from 'graphql-tag'

export const SEED_DATA = gql`
  mutation SeedData {
    seedData {
      message
      wasSuccessful
    }
  }
`
