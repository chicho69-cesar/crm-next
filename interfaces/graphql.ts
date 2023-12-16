import { OrderStatus } from '@/enums'
import { IContext, IOrderGroupWithId } from '.'

export interface Resolver {
  Query:    QueryGql
  Mutation: MutationGql
}

export interface QueryGql {
  hello:            ResolverFunc<any>
  getUser:          ResolverFunc<any>
  getUsers:         ResolverFunc<any>
  getProducts:      ResolverFunc<any>
  getProduct:       ResolverFunc<{ id: string}>
  getClients:       ResolverFunc<any>
  getClientsSeller: ResolverFunc<any>
  getClient:        ResolverFunc<{ id: string}>
  getOrders:        ResolverFunc<any>
  getOrdersSeller:  ResolverFunc<any>
  getOrder:         ResolverFunc<{ id: string}>
  getOrdersStatus:  ResolverFunc<{ status: OrderStatus}>
  topClients:       ResolverFunc<any>
  topSellers:       ResolverFunc<any>
  searchProduct:    ResolverFunc<{ text: string}>
}

export interface MutationGql {
  test:             ResolverFunc<{ message: string }>
  seedData:         ResolverFunc<any>
  newUser:          ResolverFunc<InputUser>
  updateUser:       ResolverFunc<InputUser & { id: string }>
  deleteUser:       ResolverFunc<{ id: string}>
  authenticateUser: ResolverFunc<InputAuth>
  newProduct:       ResolverFunc<InputProduct>
  updateProduct:    ResolverFunc<InputProduct & { id: string }>
  deleteProduct:    ResolverFunc<{ id: string}>
  newClient:        ResolverFunc<InputClient>
  updateClient:     ResolverFunc<InputClient & { id: string }>
  deleteClient:     ResolverFunc<{ id: string }>
  newOrder:         ResolverFunc<InputOrder>
  updateOrder:      ResolverFunc<InputOrder & { id: string }>
  deleteOrder:      ResolverFunc<{ id: string }>
}

export type ResolverFunc<T> = (root: any, args: T, ctx: IContext) => any

interface InputUser {
  input: {
    name:     string
    lastName: string
    email:    string
    password: string
  }
}

interface InputAuth {
  input: {
    email:    string
    password: string
  }
}

interface InputProduct {
  input: {
    name:      string
    existence: number
    price:     number
  }
}

interface InputClient {
  input: {
    name:     string
    lastName: string
    company:  string
    email:    string
    phone:    string | null
  }
}

interface InputOrder {
  input : {
    client: string
    order:  IOrderGroupWithId[]
    total:  number
    status: OrderStatus
  }
}
