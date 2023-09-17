import { gql } from 'graphql-tag'

export const typeDefs = gql`
  type User {
    id: ID
    name: String
    lastName: String
    email: String
    createdAt: String
  }

  type Token {
    token: String
  }

  type Product {
    id: ID
    name: String
    existence: Int
    price: Float
    createdAt: String
  }

  type Client {
    id: ID
    name: String
    lastName: String
    company: String
    email: String
    phone: String
    seller: ID
  }

  type Order {
    id: ID
    order: [OrderGroup]
    total: Float
    client: Client
    seller: ID
    date: String
    status: OrderStatus
  }

  type OrderGroup {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  type TopClient {
    total: Float
    client: [Client]
  }

  type TopSeller {
    total: Float
    seller: [User]
  }

  type SeedResponse {
    wasSuccessful: Boolean
    message: String
  }

  input UserInput {
    name: String!
    lastName: String!
    email: String!
    password: String!
  }

  input AuthenticateInput {
    email: String!
    password: String!
  }

  input ProductInput {
    name: String!
    existence: Int!
    price: Float!
  }

  input ClientInput {
    name: String!
    lastName: String!
    company: String!
    email: String!
    phone: String
  }

  input OrderInput {
    order: [OrderProductInput]
    total: Float
    client: ID
    status: OrderStatus
  }

  input OrderProductInput {
    id: ID
    quantity: Int
    name: String
    price: Float
  }

  enum OrderStatus {
    PENDING
    COMPLETED
    CANCELED
  }

  type Query {
    # Test
    hello: String

    # Users
    getUser: User

    # Products
    getProducts: [Product]
    getProduct(id: ID!): Product

    # Clients
    getClients: [Client]
    getClientsSeller: [Client]
    getClient(id: ID!): Client

    # Orders
    getOrders: [Order]
    getOrdersSeller: [Order]
    getOrder(id: ID!): Order
    #! getOrdersStatus(status: String!): [Order]
    getOrdersStatus(status: OrderStatus!): [Order]

    # Advanced Searches
    topClients: [TopClient]
    topSellers: [TopSeller]
    searchProduct(text: String!): [Product]
  }

  type Mutation {
    # Test
    test(message: String): String

    # Seed data
    seedData: SeedResponse

    # Users
    newUser(input: UserInput): User
    authenticateUser(input: AuthenticateInput): Token

    # Products
    newProduct(input: ProductInput): Product
    updateProduct(id: ID!, input: ProductInput): Product
    deleteProduct(id: ID!): String

    # Clients
    newClient(input: ClientInput): Client
    updateClient(id: ID!, input: ClientInput): Client
    deleteClient(id: ID!): String

    # Orders
    newOrder(input: OrderInput): Order
    updateOrder(id: ID!, input: OrderInput): Order
    # deleteOrder(id: ID!): String
  }
`
