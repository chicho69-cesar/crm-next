import Link from 'next/link'
import { useRouter } from 'next/router'

export default function Navbar() {
  const { asPath } = useRouter()

  return (
    <nav className='w-1/5 bg-slate-800 p-4 flex flex-col items-start justify-start gap-4 h-screen fixed'>
      <h3 className='text-2xl text-white font-bold'>CRM Clientes</h3>

      <ul className='list-none w-full mb-6 flex flex-col justify-center items-start gap-4'>
        <li className='inline-block w-full'>
          <Link
            href='/'
            className={`
              text-white inline-block w-full rounded-md 
              ${asPath === '/' ? 'bg-slate-700 shadow-sm p-2' : ''}`
            }
          >
            Clientes
          </Link>
        </li>

        <li className='inline-block w-full'>
          <Link
            href='/orders'
            className={`
              text-white inline-block w-full rounded-md 
              ${asPath === '/orders' ? 'bg-slate-700 shadow-sm p-2' : ''}`
            }
          >
            Pedidos
          </Link>
        </li>

        <li className='inline-block w-full'>
          <Link
            href='/products'
            className={`
              text-white inline-block w-full rounded-md 
              ${asPath === '/products' ? 'bg-slate-700 shadow-sm p-2' : ''}`
            }
          >
            Productos
          </Link>
        </li>
      </ul>

      <h3 className='text-2xl text-white font-bold'>CRM Vendedores</h3>

      <ul className='list-none w-full mb-6 flex flex-col justify-center items-start gap-4'>
        <li className='inline-block w-full'>
          <Link
            href='/sellers'
            className={`
              text-white inline-block w-full rounded-md 
              ${asPath === '/sellers' ? 'bg-slate-700 shadow-sm p-2' : ''}`
            }
          >
            Vendedores
          </Link>
        </li>
      </ul>
      
      <h3 className='text-2xl text-white font-bold'>Otras Opciones</h3>

      <ul className='list-none w-full mb-6 flex flex-col justify-center items-start gap-4'>
        <li className='inline-block w-full'>
          <Link
            href='/top-sellers'
            className={`
              text-white inline-block w-full rounded-md 
              ${asPath === '/top-sellers' ? 'bg-slate-700 shadow-sm p-2' : ''}`
            }
          >
            Mejores vendedores
          </Link>
        </li>

        <li className='inline-block w-full'>
          <Link
            href='/top-clients'
            className={`
              text-white inline-block w-full rounded-md 
              ${asPath === '/top-clients' ? 'bg-slate-700 shadow-sm p-2' : ''}`
            }
          >
            Mejores clientes
          </Link>
        </li>
      </ul>
    </nav>
  )
}
