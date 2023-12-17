import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts'

import { GET_TOP_CLIENTS } from '@/graphql/client'
import { TopClients } from '@/interfaces'

export default function TopClientsGraph() {
  const { data } = useQuery(GET_TOP_CLIENTS, {
    pollInterval: 1000
  })
  const [graphData, setGraphData] = useState<{ total: number, name: string }[]>([])

  useEffect(() => {
    if (data) {
      const clientsTop = data.topClients as TopClients[]

      setGraphData(clientsTop.map((client) => ({
        total: client.total,
        name: client.client[0].name
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
