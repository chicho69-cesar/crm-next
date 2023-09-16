import { Product } from '@/models'
import * as db from '@/config/db'

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

export async function getProduct(id: string) {
  try {
    await db.connect()
    const product = await Product.findById(id)
    await db.disconnect()
  
    return product
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error(`Error getting the product with id: ${id}`)
  }
}

export async function updateProduct(
  id: string,
  name: string,
  existence: number,
  price: number
) {
  await db.connect()

  const product = await Product.findById(id)
  if (!product) throw new Error('This product does not exists')

  try {
    const productUpdated = await Product.findOneAndUpdate(
      { _id: id },
      { name, existence, price },
      { new: true }
    )

    await db.disconnect()

    return productUpdated
  } catch (error) {
    console.log(error)
    throw new Error(`Error updating the product with id: ${id}`)
  }
}

export async function deleteProduct(id: string) {
  await db.connect()

  const product = await Product.findById(id)
  if (!product) throw new Error('This product does not exists')

  try {
    await Product.findOneAndDelete({ _id: id })
    await db.disconnect()

    return 'The product was deleted successfully'
  } catch (error) {
    console.log(error)
    throw new Error(`Error deleting the product with id: ${id}`)
  }
}
