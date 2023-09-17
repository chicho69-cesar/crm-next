import { seedData } from '@/database'
import { IContext } from '@/interfaces'
import { getUser, newUser, authenticateUser } from '@/services/users.service'
import { newProduct, getProducts, getProduct, updateProduct, deleteProduct, searchProduct } from '@/services/products.service'
import { deleteClient, getClient, getClients, getClientsSeller, newClient, updateClient } from '@/services/clients.service'
import { deleteOrder, getOrder, getOrders, getOrdersSeller, getOrdersStatus, newOrder, topClients, topSellers, updateOrder } from '@/services/orders.service'

/* TODO: Add types for root and args */
export const resolvers = {
  Query: {
    // TEST
    hello: () => {
      return 'Hello world!!!'
    },
    // USERS
    getUser: async (root: any, args: any, ctx: IContext ) => {
      if (!ctx.user) throw new Error('User not authenticated')
      return getUser(ctx.user._id)
    },
    // PRODUCTS
    getProducts: async () => {
      return getProducts()
    },
    getProduct: async (_: any, args: any) => {
      const { id } = args
      return getProduct(id)
    },
    // CLIENTS
    getClients: async () => {
      return getClients()
    },
    getClientsSeller: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')
      const { _id: sellerId } = ctx.user
      return getClientsSeller(sellerId)
    },
    getClient: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')

      const { _id: sellerId } = ctx.user
      const { id } = args

      console.log({ id, sellerId })

      return getClient(id, sellerId)
    },
    // ORDERS
    getOrders: async () => {
      return getOrders()
    },
    getOrdersSeller: async (_:any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')
      const { _id: sellerId } = ctx.user
      return getOrdersSeller(sellerId)
    },
    getOrder: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')
      
      const { _id: sellerId } = ctx.user
      const { id } = args

      return getOrder(id, sellerId)
    },
    getOrdersStatus: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')
      
      const { _id: sellerId } = ctx.user
      const { status } = args

      return getOrdersStatus(status, sellerId)
    },
    // ADVANCED
    topClients: async () => {
      return topClients()
    },
    topSellers: async () => {
      return topSellers()
    },
    searchProduct: async (_: any, args: any) => {
      const { text } = args
      return searchProduct(text)
    }
  },
  Mutation: {
    // TEST
    test: async (_: any, args: any, ctx: IContext) => {
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
      return newProduct(name, existence, price)
    },
    updateProduct: async (_: any, args: any) => {
      const { id } = args
      const { name, existence, price } = args.input
      return updateProduct(id, name, existence, price)
    },
    deleteProduct: async (_: any, args: any) => {
      const { id } = args
      return deleteProduct(id)
    },
    // CLIENTS
    newClient: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')

      const { name, lastName, company, email, phone } = args.input
      const { _id: seller } = ctx.user

      return newClient(name, lastName, company, email, phone, seller)
    },
    updateClient: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')

      const { id: clientId } = args
      const { _id: seller } = ctx.user
      const { name, lastName, company, email, phone } = args.input

      return updateClient(clientId, seller, name, lastName, company, email, phone)
    },
    deleteClient: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')

      const { id: clientId } = args
      const { _id: seller } = ctx.user

      return deleteClient(clientId, seller)
    },
    // ORDERS
    newOrder: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')

      const { order, total, client, status } = args.input
      const { _id: seller } = ctx.user

      return newOrder(client, order, total, status, seller)
    },
    updateOrder: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')

      const { id: orderId } = args
      const { order, total, client, status } = args.input
      const { _id: seller } = ctx.user

      return updateOrder(orderId, client, order, total, status, seller)
    },
    deleteOrder: async (_: any, args: any, ctx: IContext) => {
      if (ctx.user == null) throw new Error('Seller must be authenticated')

      const { id: orderId } = args
      const { _id: seller } = ctx.user

      return deleteOrder(orderId, seller)
    }
  }
}
