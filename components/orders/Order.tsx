import Swal from 'sweetalert2'

import { OrderStatus } from '@/enums'
import { Order } from '@/interfaces'
import { dateFormatter, priceFormatter } from '@/utils/formatters'
import { Button } from '../ui'
import { useState } from 'react'
import { updateOrderStatus } from '@/graphql/services/orders.mutations'
import { useAppSelector } from '@/hooks/store'

interface Props {
  order: Order
}

export default function Order({ order }: Props) {
  const { token } = useAppSelector((state) => state.auth)
  const [status, setStatus] = useState(order.status)

  const handleChangeStatus = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    const prevStatus = status
    
    if (value === 'completed') {
      setStatus(OrderStatus.COMPLETED)
    } else if (value === 'pending') {
      setStatus(OrderStatus.PENDING)
    } else {
      setStatus(OrderStatus.CANCELED)
    }

    try {
      if (token) {
        await updateOrderStatus(token, order.id, value.toUpperCase())
      } else {
        setStatus(prevStatus)
      }
    } catch (error) {
      console.log(error)
      Swal.fire({
        title: 'Error!',
        text: 'Ocurrió un error al cambiar el estado del pedido.',
        icon: 'error'
      })

      setStatus(prevStatus)
    }
  }

  return (
    <article
      className={`
        w-full p-4 bg-white border-t-8 rounded-md shadow-md
        grid grid-cols-2 gap-2 justify-center items-center
        ${status === OrderStatus.COMPLETED ? 'border-t-green-500': ''}
        ${status === OrderStatus.PENDING ? 'border-t-yellow-400': ''}
        ${status === OrderStatus.CANCELED ? 'border-t-red-500': ''}
      `}
    >
      <section className='self-start'>
        <h2 className='text-xl font-semibold mb-2'>
          Cliente:{' '}
          <span className='font-normal'>
            {order.client.name} {order.client.lastName}
          </span>
        </h2>

        <p className='font-medium'>
          Correo:{' '}
          <span className='font-normal'>
            {order.client.email}
          </span>
        </p>

        <p className='font-medium'>
          Teléfono:{' '}
          <span className='font-normal'>
            {order.client.phone}
          </span>
        </p>

        <p className='font-medium'>
          Fecha del pedido:{' '}
          <span className='font-normal'>
            {dateFormatter.format(Number(order.date))}
          </span>
        </p>
      </section>
      
      <section className='self-start'>
        <h2 className='text-xl font-semibold mb-2'>
          Resumen del pedido
        </h2>

        {order.order.map((product) => (
          <article key={product.id} className='mb-2'>
            <p className='text-gray-600'>
              Producto:{' '}
              <span className='font-thin'>
                {product.name}
              </span>
            </p>

            <p className='text-gray-600'>
              Cantidad:{' '}
              <span className='font-thin'>
                {product.quantity}
              </span>
            </p>

            <p className='text-gray-600'>
              Precio:{' '}
              <span className='font-thin'>
                {priceFormatter.format(product.price)}
              </span>
            </p>
          </article>
        ))}

        <h3 className='text-lg font-semibold'>
          Total a pagar:{' '}
          <span>
            {priceFormatter.format(order.total)}
          </span>
        </h3>
      </section>
      
      <section className='self-end'>
        <h2 className='text-xl font-semibold mb-2'>
          Estado del pedido: 
        </h2>

        <select
          defaultValue={order.status.toLowerCase()}
          onChange={handleChangeStatus}
          className='py-2 px-8 border border-gray-400 rounded-md outline-none'
        >
          <option value='completed'>Completado</option>
          <option value='pending'>Pendiente</option>
          <option value='canceled'>Cancelado</option>
        </select>
      </section>
      
      <section>
        <Button size='md' bgColor='bg-red-600'>
          Eliminar pedido
        </Button>
      </section>
    </article>
  )
}
