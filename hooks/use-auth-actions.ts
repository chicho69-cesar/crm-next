import { useAppDispatch } from './store'
import { login, logout } from '@/store/auth/actions'
import { type User } from '@/interfaces'

export default function useAuthActions() {
  const dispatch = useAppDispatch()

  const handleLogin = (user: User) => {
    dispatch(login(user))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return {
    login: handleLogin,
    logout: handleLogout
  }
}
