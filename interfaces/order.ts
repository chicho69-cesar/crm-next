import { OrderStatus } from '@/enums'

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
