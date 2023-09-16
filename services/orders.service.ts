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
