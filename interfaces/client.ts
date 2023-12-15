export interface IClient {
  _id:        string
  name:       string
  lastName:   string
  company:    string
  email:      string
  phone?:     string
  seller:     string
  createdAt?: string
  updatedAt?: string
}

export interface Client {
  id: string
  name: string
  lastName: string
  email: string
  company: string
  phone: string
  seller: string
}
