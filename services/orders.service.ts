import { Product, Order, Client } from '@/models'
import * as db from '@/config/db'
import type { GqlError, IOrderGroupWithId } from '@/interfaces'
import { OrderStatus } from '@/enums'

export async function newOrder(
  client: string,
  order: IOrderGroupWithId[],
  total: number,
  status: OrderStatus,
  sellerId: string,
) {
  try {
    await db.connect()

    const clientExists = await Client.findById(client)
    
    if (!clientExists) throw new Error('This client does not exists')
    if (clientExists.seller.toString() !== sellerId.toString()) throw new Error('This client does not belongs to this seller')

    for await (const article of order) {
      const { id } = article
      const product = await Product.findById(id)

      if (!product) {
        throw new Error(`The product with id: ${id} does not exists`)
      } else if (article.quantity > product.existence) {
        throw new Error(`The product with id: ${id} does not have enough stock`)
      } else {
        product.existence -= article.quantity
        await product.save()
      }
    }

    const orderAdded = new Order({
      order,
      total,
      status,
      client,
      seller: sellerId
    })

    await orderAdded.populate('client')
    const result = await orderAdded.save()

    await db.disconnect()

    return result
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error((error as GqlError).message)
  }
}

export async function getOrders() {
  try {
    await db.connect()
    const orders = await Order.find({}).populate('client')
    await db.disconnect()

    return orders
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error('Error getting the orders')
  }
}

export async function getOrdersSeller(sellerId: string) {
  try {
    await db.connect()
    
    const orders = await Order.find({
      seller: sellerId
    }).populate('client')

    await db.disconnect()

    return orders
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error(`Error getting the orders sold of the seller with id: ${sellerId}`)
  }
}

export async function getOrder(id: string, sellerId: string) {
  try {
    await db.connect()
    const order = await Order.findById(id).populate('client')
    await db.disconnect()

    if (!order) throw new Error('This order does not exists')
    if (order.seller.toString() !== sellerId.toString()) throw new Error('This order does not belongs to this seller')

    return order
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error((error as GqlError).message)
  }
}

export async function getOrdersStatus(status: OrderStatus, sellerId: string) {
  try {
    await db.connect()
    
    const orders = await Order.find({
      seller: sellerId,
      status
    }).populate('client')

    await db.disconnect()

    return orders
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error(`Error getting the orders with status: ${status}`)
  }
}







export async function topClients() {
  try {
    await db.connect()

    const clients = await Order.aggregate([
      {
        $match: {
          status: OrderStatus.COMPLETED
        }
      },
      {
        $group: {
          _id: '$client',
          total: { $sum: '$total' },
        }
      },
      {
        $lookup: {
          from: 'clients',
          localField: '_id',
          foreignField: '_id',
          as: 'client'
        }
      },
      { $limit: 10 },
      { $sort: { total: -1 } }
    ])

    await db.disconnect()

    return clients
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error('Error querying the top clients')
  }
}

export async function topSellers() {
  try {
    await db.connect()

    const sellers = await Order.aggregate([
      {
        $match: {
          status: OrderStatus.COMPLETED
        }
      },
      {
        $group: {
          _id: '$seller',
          total: { $sum: '$total' },
        }
      },
      {
        $lookup: {
          from: 'users',
          localField: '_id',
          foreignField: '_id',
          as: 'seller'
        }
      },
      { $limit: 3 },
      { $sort: { total: -1 } }
    ])

    await db.disconnect()

    return sellers
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error('Error querying the top sellers')
  }
}
