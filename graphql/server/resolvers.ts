import { seedData } from '@/database'
import { IContext } from '@/interfaces'
import { authenticateUser } from '@/services/users.service'

export const resolvers = {
  Query: {
    hello: () => 'Hello world!!!',
  },
  Mutation: {
    test: (root: any, args: any, ctx: IContext) => {
      console.log(args.message)
      return ctx.user ? ctx.user?.name : 'User not authenticated'
    },
    seedData: async () => {
      if (process.env.NODE_ENV === 'production') {
        return {
          wasSuccessful: false,
          message: 'The seed of data is only available in development mode'
        }
      }

      const result = await seedData()
      return result
    },
    // newUser,
    authenticateUser: async (root: any, args: any) => {
      const { email, password } = args.input
      const token = await authenticateUser(email, password)
      return { token }
    }
  }
}
