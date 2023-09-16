import { Client } from '@/models'
import * as db from '@/config/db'

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

    throw new Error('Error creating client')
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

    throw new Error('Error getting clients')
  }
}
