export interface IUser {
  _id:        string
  name:       string
  lastName:   string
  email:      string
  password:   string
  createdAt?: string
  updatedAt?: string
}

export interface IUserLogged {
  _id:   string
  name:  string
  email: string
}

export interface User {
  id: string
  name: string
  lastName: string
  email: string
}
