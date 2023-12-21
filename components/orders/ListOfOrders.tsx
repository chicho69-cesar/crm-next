import { useQuery } from '@apollo/client'

import { GET_ORDERS_SELLER } from '@/graphql/client'
import { useAppSelector } from '@/hooks/store'
import { Order } from '@/interfaces'
import { Order as OrderComponent } from '.'

export default function ListOfOrders() {
  const { token } = useAppSelector((state) => state.auth)
  const { data } = useQuery(GET_ORDERS_SELLER, {
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return (
    <div className='mt-6 w-full flex flex-col gap-4 justify-start items-start'>
      {data && (data.getOrdersSeller as Order[]).map((order) => (
        <OrderComponent key={order.id} order={order} />
      ))}
    </div>
  )
}
