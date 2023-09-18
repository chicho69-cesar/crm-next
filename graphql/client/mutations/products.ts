import { gql } from 'graphql-tag'

export const NEW_PRODUCT = gql`
  mutation NewProduct($input: ProductInput) {
    newProduct(input: $input) {
      createdAt
      existence
      id
      name
      price
    }
  }
`

export const UPDATE_PRODUCT = gql`
  mutation UpdateProduct($updateProductId: ID!, $input: ProductInput) {
    updateProduct(id: $updateProductId, input: $input) {
      id
      name
      price
      existence
    }
  }
`

export const DELETE_PRODUCT = gql`
  mutation DeleteProduct($deleteProductId: ID!) {
    deleteProduct(id: $deleteProductId)
  }
`
