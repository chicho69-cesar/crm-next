import { useRouter } from 'next/router'

import { Button } from '.'
import { useAppSelector } from '@/hooks/store'
import useAuthActions from '@/hooks/use-auth-actions'
import { clearSession } from '@/utils/session'

export default function Header() {
  const router = useRouter()
  const { user, isAuth } = useAppSelector((state) => state.auth)
  const { logout } = useAuthActions()

  const handleLogout = () => {
    const result = clearSession()
    
    if (result) {
      logout()
      router.replace('/auth/login')
    }
  }

  return (
    <div className='w-full flex justify-between items-center gap-4'>
      <h2 className='text-xl font-bold'>
        {isAuth ? (
          <span>
            Hola, {user?.name} {user?.lastName}
          </span>
        ) : (
          <span className='text-red-500'>
            No estas autenticado
          </span>
        )}
      </h2>

      {isAuth && (
        <Button onClick={handleLogout}>
          Cerrar sesión
        </Button>
      )}
    </div>
  )
}
