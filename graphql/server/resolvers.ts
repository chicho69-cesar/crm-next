import { seedData } from '@/database'

export const resolvers = {
  Query: {
    hello: () => 'Hello world!!!',
  },
  Mutation: {
    test: (root: any, args: any, ctx: any) => {
      console.log(ctx.user)
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
  }
}
