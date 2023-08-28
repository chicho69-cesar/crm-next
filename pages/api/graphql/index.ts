import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'
import { gql } from 'graphql-tag'

const typeDefs = gql`
  type Query {
    hello: String
  }
`

const resolvers = {
  Query: {
    hello: () => 'Hello world!',
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

export default startServerAndCreateNextHandler(server)
