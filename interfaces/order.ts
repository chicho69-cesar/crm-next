import { OrderStatus } from '@/enums'
import { Client } from './client'

export interface IOrder {
  _id:        string
  order:      IOrderGroup[]
  total:      number
  client:     string
  seller:     string
  date:       string
  status:     OrderStatus
  createdAt?: string
  updatedAt?: string
}

export interface IOrderGroup {
  _id:      string
  quantity: number
  name:     string
  price:    number
}

export type IOrderGroupWithId = IOrderGroup & { id: string }

export interface Order {
  id: string
  order: OrderData[]
  client: Client
  date: string
  status: OrderStatus
  total: number
  seller: string
}

export interface OrderData {
  id: string
  name: string
  price: number
  quantity: number
}
