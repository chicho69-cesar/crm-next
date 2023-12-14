import { type User } from '@/interfaces'
import { Button } from '.'

interface Props {
  user: User
}

export default function Header({ user }: Props) {
  return (
    <div className='w-full p-4 flex justify-between items-center gap-4'>
      <h2 className='text-xl font-bold'>
        Hola, {user.name} {user.lastName}
      </h2>

      <Button>
        Cerrar sesión
      </Button>
    </div>
  )
}
