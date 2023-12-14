import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import { client } from '@/graphql/apollo-client'
import { MainLayout } from '@/components/layouts'
import { Header } from '@/components/ui'
import { validateToken } from '@/utils'
import { GET_USER } from '@/graphql/client'
import { type User } from '@/interfaces'
import useAuthActions from '@/hooks/use-auth-actions'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  user: User
}

export default function HomePage({ user }: Props) {
  const { login } = useAuthActions()
  login(user)

  return (
    <MainLayout title='Home' pageDescription='CRM clients for company administration'>
      <Header user={user} />

      <Link href='/api/graphql' className="">
        Go to the GraphQL Playground
      </Link>

      <h1 className='text-3xl text-slate-900 first-letter:text-4xl'>
        Hola Mundo
      </h1>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const { cookies: { token = '' } } = req
  let isValidToken = await validateToken(token)

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true
      }
    }
  }

  const { data } = await client.query({
    query: GET_USER,
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  return {
    props: {
      user: data.getUser
    }
  }
}
