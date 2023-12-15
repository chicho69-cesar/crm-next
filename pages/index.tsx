import { GetServerSideProps } from 'next'

import { MainLayout } from '@/components/layouts'
import useAuthActions from '@/hooks/use-auth-actions'
import { Client, type User } from '@/interfaces'
import { getUser } from '@/graphql/services/users.queries'
import { validateToken } from '@/utils'
import { getClientsSeller } from '@/graphql/services/clients.queries'

interface Props {
  user: User
  token: string
  clients: Client[]
}

export default function HomePage({ user, token, clients }: Props) {
  const { login } = useAuthActions()
  login(user, token)

  return (
    <MainLayout title='Home' pageDescription='CRM clients for company administration'>
      <h1 className='text-3xl text-slate-900 first-letter:text-4xl'>
        Hola Mundo
      </h1>

      {clients.map((client) => (
        <p key={client.id}>
          {client.name}
        </p>
      ))}
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

  const user = await getUser(token)
  const clients = await getClientsSeller(token)

  return {
    props: {
      user,
      token,
      clients
    }
  }
}
