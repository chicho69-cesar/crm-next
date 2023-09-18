import { gql } from 'graphql-tag'

export const GET_PRODUCT = gql`
  query GetProduct($getProductId: ID!) {
    getProduct(id: $getProductId) {
      existence
      id
      name
      price
    }
  }
`

export const GET_PRODUCTS = gql`
  query GetProducts {
    getProducts {
      id
      name
      existence
      price  
    }
  }
`
