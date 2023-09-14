import { Product } from '@/models'
import * as db from '@/config/db'
import { mapObject } from '@/utils'

export async function newProduct(name: string, existence: number, price: number) {
  try {
    await db.connect()

    const product = new Product({
      name,
      existence,
      price,
    })

    await product.save()
    await db.disconnect()

    return product
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error('Error creating product')
  }
}

export async function getProducts() {
  try {
    await db.connect()
    const products = await Product.find({})
    await db.disconnect()

    return products
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error('Error getting products')
  }
}
