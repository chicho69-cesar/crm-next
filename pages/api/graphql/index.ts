import { ApolloServer } from '@apollo/server'
import { startServerAndCreateNextHandler } from '@as-integrations/next'

import { resolvers, typeDefs } from '@/graphql/server'
import { getLoggedUser } from '@/services/users.service'
import { IUserLogged, IContext } from '@/interfaces'

const server = new ApolloServer<IContext>({
  typeDefs,
  resolvers: resolvers as any,
})

export default startServerAndCreateNextHandler(server, {
  context: async (req, res) => {
    const token = req.headers.authorization || ''
    let user: (IUserLogged | null) = await getLoggedUser(token)
    return { req, res, user }
  }
})
