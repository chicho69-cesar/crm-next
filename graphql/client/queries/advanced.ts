import { gql } from 'graphql-tag'

export const GET_TOP_CLIENTS = gql`
  query TopClients {
    topClients {
      total
      client {
        id
        name
        lastName
        email
        company
        phone
        seller
      }
    }
  }
`

export const GET_TOP_SELLERS = gql`
  query TopSellers {
    topSellers {
      total
      seller {
        id
        name
        lastName
        email
        createdAt
      }
    }
  }
`

export const SEARCH_PRODUCT = gql`
  query SearchProduct($text: String!) {
    searchProduct(text: $text) {
      id
      name
      price
      existence
      createdAt
    }
  }
`
