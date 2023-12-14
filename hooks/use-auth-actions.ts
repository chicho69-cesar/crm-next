import { type UserState } from '@/store/auth/slice'
import { useAppDispatch } from './store'
import { login, logout } from '@/store/auth/actions'

export default function useAuthActions() {
  const dispatch = useAppDispatch()

  const handleLogin = (user: UserState) => {
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
