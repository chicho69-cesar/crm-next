import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import { client } from '@/graphql/apollo-client'
import { HELLO } from '@/graphql/client'
import { MainLayout } from '@/components/layouts'
import { Header } from '@/components/ui'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  message: string
}

export default function HomePage({ message }: Props) {
  return (
    <MainLayout title='Home' pageDescription='CRM clients for company administration'>
      <Header />

      <Link href='/api/graphql' className="">
        Go to the GraphQL Playground
      </Link>

      <h1 className='text-3xl text-slate-100 first-letter:text-4xl'>
        {message}
      </h1>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await client.query({
    query: HELLO
  })

  return {
    props: {
      message: data.hello
    }
  }
}
