import mongoose, { ConnectionStates } from 'mongoose'

type Connection = {
  isConnected: ConnectionStates
}

const mongoConnection: Connection = {
  isConnected: ConnectionStates.disconnected
}

export async function connect() {
  if (mongoConnection.isConnected === ConnectionStates.connected) {
    console.log('We are already connected')
    return
  }

  if (mongoose.connections.length > 0) {
    const { readyState } = mongoose.connections[0]
    mongoConnection.isConnected = readyState

    if (mongoConnection.isConnected === ConnectionStates.connected) {
      console.log('Using previous connection')
      return
    }

    await mongoose.disconnect()
  }

  await mongoose.connect(process.env.MONGO_URL || '')
  mongoConnection.isConnected = ConnectionStates.connected

  console.log(`Connected to DB: ${process.env.MONGO_URL}`)
}

export async function disconnect() {
  if (process.env.NODE_ENV === 'development') return
  if (mongoConnection.isConnected === ConnectionStates.disconnected) return

  await mongoose.disconnect()
  mongoConnection.isConnected = ConnectionStates.disconnected
  
  console.log('Disconnected from DB')
}
