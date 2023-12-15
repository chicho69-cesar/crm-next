export interface IProduct {
  _id:        string
  name:       string
  existence:  number
  price:      number
  createdAt?: string
  updatedAt?: string
}

export interface Product {
  id: string
  name: string
  price: number
  existence: number
  createdAt?: string
}
