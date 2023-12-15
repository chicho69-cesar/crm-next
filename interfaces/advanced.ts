import { Client, User } from '.'

export interface TopClients {
  total: number
  client: Client[]
}

export interface TopSellers {
  total: number
  seller: User[]
}
