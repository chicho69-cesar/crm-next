import jwt from 'jsonwebtoken'

export function signToken(_id: string, email: string) {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  return jwt.sign(
    { _id, email },
    process.env.JWT_SECRET,
    { expiresIn: '30d' }
  )
}

export function isValidToken(token: string): Promise<string> {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET is not defined')
  }

  if (token.length <= 10) {
    return Promise.reject('Invalid token')
  }

  return new Promise((resolve, reject) => {
    try {
      jwt.verify(token, process.env.JWT_SECRET || '', (err, payload) => {
        if (err) return reject('Invalid token')

        const { _id } = payload as { _id: string }
        return resolve(_id)
      })
    } catch (error) {
      return reject('Invalid token')
    }
  })
}
