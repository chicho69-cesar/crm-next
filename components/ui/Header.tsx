import { type User } from '@/interfaces'
import { Button } from '.'
import { useAppSelector } from '@/hooks/store'

interface Props {
  user: User
}

export default function Header() {
  const { user, isAuth } = useAppSelector((state) => state.auth)

  return (
    <div className='w-full p-4 flex justify-between items-center gap-4'>
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
        <Button>
          Cerrar sesión
        </Button>
      )}
    </div>
  )
}
