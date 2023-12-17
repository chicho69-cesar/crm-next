import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

import { GET_TOP_SELLERS } from '@/graphql/client'
import { TopSellers } from '@/interfaces'

export default function TopSellersGraph() {
  const { data } = useQuery(GET_TOP_SELLERS, {
    pollInterval: 1000
  })
  const [graphData, setGraphData] = useState<{ total: number, name: string }[]>([])

  useEffect(() => {
    if (data) {
      const sellersTop = data.topSellers as TopSellers[]

      setGraphData(sellersTop.map((seller) => ({
        total: seller.total,
        name: seller.seller[0].name
      })))
    }
  }, [data])

  return (
    <div className='mt-8 w-full'>
      <BarChart width={900} height={400} data={graphData}>
        <CartesianGrid strokeDasharray='3 3' />
        <XAxis dataKey='name' />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey='total' fill='rgb(15 23 42)' />
      </BarChart>
    </div>
  )
}
