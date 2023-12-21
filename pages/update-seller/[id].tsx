/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError, useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { MainLayout } from '@/components/layouts'
import { InputWrapper, SubmitError } from '@/components/ui'
import { GET_USER_BY_ID } from '@/graphql/client'
import { updateUser } from '@/graphql/services/users.mutations'
import { getUser } from '@/graphql/services/users.queries'
import useAuthActions from '@/hooks/use-auth-actions'
import useForm from '@/hooks/use-form'
import type { User } from '@/interfaces'
import { validateToken } from '@/utils'

interface Props {
  user: User
  token: string
  id: string
}

type FormData = {
  name: string
  lastName: string
  email: string
  password: string
}

export default function UpdateSellerPage({ user, token, id }: Props) {
  const router = useRouter()
  const { login } = useAuthActions()
  login(user, token)

  const { data } = useQuery(GET_USER_BY_ID, {
    variables: {
      getUserByIdId: id
    }
  })

  const { formData, errors, submitError, setSubmitError, setFormData, handleChange } = useForm<FormData>({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      password: ''
    }
  })

  useEffect(() => {
    if (data) {
      const { name, lastName, email } = data.getUserById as User
      setFormData({ name, lastName, email, password: '' })
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(errors).some(error => error !== undefined)) {
      setSubmitError('Por favor, complete todos los campos')
      return
    }

    try {
      const { name, lastName, email, password } = formData
      await updateUser(id, name, lastName, email, password)

      router.replace('/sellers')
    } catch (error: any) {
      setSubmitError((error as ApolloError).graphQLErrors[0].message)
    }
  }

  return (
    <MainLayout title='Client' pageDescription='CRM clients for company administration'>
      <h1 className='text-3xl text-slate-900 first-letter:text-4xl'>
        Editar vendedor con id: <span className='font-medium'>{id}</span>
      </h1>

      <form className='block w-1/2 mx-auto mt-8 bg-white py-4 px-6 shadow-lg' onSubmit={handleSubmit}>
        <div className='mb-4'>
          {submitError && <SubmitError message={submitError} />}
        </div>

        <InputWrapper inputFor='name' label='Nombre'>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Nombre del vendedor...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.name}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper inputFor='lastName' label='Apellidos'>
          <input
            type='text'
            id='lastName'
            name='lastName'
            placeholder='Apellidos del vendedor...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.lastName}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper inputFor='email' label='Email'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email del vendedor...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.email}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper inputFor='password' label='Password'>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='Nueva contraseña del vendedor...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.password}
            onChange={handleChange}
          />
        </InputWrapper>

        <button
          className='mt-4 w-full bg-slate-900 py-2 px-4 font-bold text-lg text-center text-white rounded-md shadow-lg transition hover:scale-95'
          type='submit'
        >
          Actualizar vendedor
        </button>
      </form>
    </MainLayout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ req, query }) => {
  const { cookies: { token = '' } } = req
  const { id = '' } = query

  let isValidToken = await validateToken(token)

  if (!isValidToken) {
    return {
      redirect: {
        destination: '/auth/login',
        permanent: true
      }
    }
  }

  const sellerId = typeof id === 'string' ? id : id[0]
  const user = await getUser(token)

  return {
    props: {
      user,
      token,
      id: sellerId
    }
  }
}
