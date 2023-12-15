import { useAppDispatch } from './store'
import { login, logout, setToken } from '@/store/auth/actions'
import { type User } from '@/interfaces'

export default function useAuthActions() {
  const dispatch = useAppDispatch()

  const handleLogin = (user: User, token: string) => {
    dispatch(login(user))
    dispatch(setToken(token))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    login: handleLogin,
    logout: handleLogout
  }
}
