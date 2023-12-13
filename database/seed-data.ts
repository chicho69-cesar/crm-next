import bcrypt from 'bcryptjs'

import { OrderStatus } from '@/enums'
import { IOrderGroup } from '@/interfaces'
import { Client, Order, Product, User } from '@/models'
import * as db from '@/config/db'

interface SeedClient {
  name:     string
  lastName: string
  company:  string
  email:    string
  phone?:   string
  seller:   string
}

interface SeedOrder {
  order:  IOrderGroup[]
  total:  number
  client: string
  seller: string
  date:   string
  status: OrderStatus
}

interface SeedProduct {
  name:      string
  existence: number
  price:     number
}

interface SeedUser {
  name:     string
  lastName: string
  email:    string
  password: string
}

interface SeedData {
  clients:  SeedClient[]
  orders:   SeedOrder[]
  products: SeedProduct[]
  users:    SeedUser[]
}

export const initialData: SeedData = {
  clients: [],
  orders: [],
  products: [
    {
      existence: 10,
      name: 'IPhone 12 Pro',
      price: 790,
    },
    {
      existence: 30,
      name: 'Teclado Keyboard',
      price: 99,
    },
    {
      existence: 10,
      name: 'AirPods',
      price: 49,
    },
    {
      existence: 5,
      name: 'MAC OS M1',
      price: 2500,
    },
    {
      existence: 5,
      name: 'IPhone 13 Pro Max',
      price: 890,
    },
  ],
  users: [
    {
      email: 'cesar-09a@hotmail.com',
      lastName: 'Villalobos Olmos',
      name: 'Cesar',
      password: bcrypt.hashSync('123456789ABC'),
    },
    {
      email: 'chamita69.liz@gmail.com',
      lastName: 'Sandoval Vallejo',
      name: 'Lizeth',
      password: bcrypt.hashSync('123456789ABC'),
    },
  ],
}

export async function seedData() {
  try {
    await db.connect()
  
    await Promise.all([
      Client.deleteMany(),
      Order.deleteMany(),
      Product.deleteMany(),
      User.deleteMany(),
    ])
  
    await Promise.all([
      Client.insertMany(initialData.clients),
      Order.insertMany(initialData.orders),
      Product.insertMany(initialData.products),
      User.insertMany(initialData.users),
    ])
  
    await db.disconnect()

    return {
      wasSuccessful: true,
      message: 'Data seeded successfully',
    }
  } catch (error) {
    console.log(error)

    return {
      wasSuccessful: false,
      message: 'Error seeding data',
    }
  }
}
