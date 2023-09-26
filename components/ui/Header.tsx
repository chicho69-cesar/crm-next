import { Button } from '.'

export default function Header() {
  return (
    <div className='w-full p-4 flex justify-between items-center gap-4'>
      <h2 className='text-xl font-bold'>
        Hola, Cesar Villalobos
      </h2>

      <Button>
        Cerrar sesión
      </Button>
    </div>
  )
}
