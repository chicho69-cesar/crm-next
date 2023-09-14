import { NextApiRequest, NextApiResponse } from 'next'
import { IUserLogged } from '.'

export interface IContext {
  req:  NextApiRequest
  res:  NextApiResponse
  user: IUserLogged | null
}
