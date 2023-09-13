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
    seedData: async () => await seedData(),
  }
}
