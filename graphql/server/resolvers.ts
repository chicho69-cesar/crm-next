import { seedData } from '@/database'
import { IContext } from '@/interfaces'
import { getUser, newUser, authenticateUser } from '@/services/users.service'
import { newProduct, getProducts, getProduct, updateProduct, deleteProduct } from '@/services/products.service'

export const resolvers = {
  Query: {
    // TEST
    hello: () => 'Hello world!!!',
    // USERS
    getUser: (root: any, args: any, ctx: IContext ) => {
      if (!ctx.user) throw new Error('User not authenticated')
      return getUser(ctx.user._id)
    },
    // PRODUCTS
    getProducts: async () => await getProducts(),
    getProduct: async (_: any, args: any) => {
      const { id } = args
      return await getProduct(id)
    }
  },
  Mutation: {
    // TEST
    test: (_: any, args: any, ctx: IContext) => {
      console.log(args.message)
      return ctx.user ? ctx.user?.name : 'User not authenticated'
    },
    // SEED
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
    // USERS
    newUser: async (_: any, args: any) => {
      const { name, lastName, email, password } = args.input
      return newUser(name, lastName, email, password)
    },
    authenticateUser: async (_: any, args: any) => {
      const { email, password } = args.input
      const token = await authenticateUser(email, password)
      return { token }
    },
    // PRODUCTS
    newProduct: async (_: any, args: any) => {
      const { name, existence, price } = args.input
      return await newProduct(name, existence, price)
    },
    updateProduct: async (_: any, args: any) => {
      const { id } = args
      const { name, existence, price } = args.input
      return updateProduct(id, name, existence, price)
    },
    deleteProduct: async (_: any, args: any) => {
      const { id } = args
      return deleteProduct(id)
    }
  }
}
