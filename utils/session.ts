import Cookies from 'js-cookie'
import { COOKIE_NAME } from '@/constants'

export async function getSession() {
  try {
    const session = await Promise.resolve(Cookies.get(COOKIE_NAME))
    return session ? JSON.parse(session) as string : null
  } catch (error) {
    return null
  }
}

export async function setSession(token: string) {
  try {
    await Promise.resolve(Cookies.set(COOKIE_NAME, token, { expires: 7 }))
    return true
  } catch (error) {
    return false
  }
}

export function clearSession() {
  try {
    Cookies.remove(COOKIE_NAME)
    return true
  } catch (error) {
    return false
  }
}
