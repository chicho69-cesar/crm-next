import { Client } from '@/models'
import * as db from '@/config/db'
import type { GqlError } from '@/interfaces'

export async function newClient(
  name: string,
  lastName: string,
  company: string,
  email: string,
  phone: (string | null),
  seller: string,
) {
  try {
    await db.connect()
    
    const clientExists = await Client.findOne({ email })
    if (clientExists) throw new Error('The client already exists')

    const client = new Client({
      name,
      lastName,
      company,
      email,
      phone,
      seller
    })

    await client.save()
    await db.disconnect()

    return client
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error((error as GqlError).message)
  }
}

export async function getClients() {
  try {
    await db.connect()
    const clients = await Client.find({})
    await db.disconnect()

    return clients
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error('Error getting the clients')
  }
}

export async function getClientsSeller(sellerId: string) {
  try {
    await db.connect()
    const clients = await Client.find({ seller: sellerId })
    await db.disconnect()

    return clients
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error(`Error getting the clients of the seller with id: ${sellerId}`)
  }
}

export async function getClient(clientId: string, sellerId: string) {
  try {
    await db.connect()
    const client = await Client.findById(clientId)
    await db.disconnect()

    if (!client) throw new Error('This client does not exists')
    if (client.seller.toString() !== sellerId.toString()) throw new Error('This client does not belongs to this seller')

    return client
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error((error as GqlError).message)
  }
}

export async function updateClient(
  clientId: string,
  seller: string,
  name: string,
  lastName: string,
  company: string,
  email: string,
  phone: (string | null),
) {
  try {
    await db.connect()
    
    const client = await Client.findById(clientId)

    if (!client) throw new Error('This client does not exists')
    if (client.seller.toString() !== seller.toString()) throw new Error('This client does not belongs to this seller')

    const clientUpdated = await Client.findByIdAndUpdate(
      { _id: clientId },
      { name, lastName, company, email, phone },
      { new: true }
    )

    await db.disconnect()

    return clientUpdated
  } catch (error) {
    console.log(error)
    await db.disconnect()

    throw new Error((error as GqlError).message)
  }
}
