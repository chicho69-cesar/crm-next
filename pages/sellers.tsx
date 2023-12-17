import { GetServerSideProps } from 'next'

import { MainLayout } from '@/components/layouts'
import { TableOfSellers } from '@/components/sellers'
import { LinkButton } from '@/components/ui'
import { getUser } from '@/graphql/services/users.queries'
import useAuthActions from '@/hooks/use-auth-actions'
import { User } from '@/interfaces'
import { validateToken } from '@/utils'

interface Props {
  user: User
  token: string
}

export default function SellersPage({ token, user }: Props) {
  const { login } = useAuthActions()
  login(user, token)

  return (
    <MainLayout title='Sellers' pageDescription='CRM clients for company administration'>
      <h1 className='text-3xl mt-4 mb-2 text-slate-900 first-letter:text-4xl'>
        Vendedores
      </h1>

      <LinkButton size='lg' to='/new-seller'>
        Nuevo Vendedor
      </LinkButton>

      <TableOfSellers />
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

  return {
    props: {
      user,
      token
    }
  }
}
