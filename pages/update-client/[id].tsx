/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError, useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { MainLayout } from '@/components/layouts'
import { InputWrapper, SubmitError } from '@/components/ui'
import { GET_CLIENT } from '@/graphql/client'
import { updateClient } from '@/graphql/services/clients.mutations'
import { getUser } from '@/graphql/services/users.queries'
import useAuthActions from '@/hooks/use-auth-actions'
import useForm from '@/hooks/use-form'
import type { Client, User } from '@/interfaces'
import { validateToken } from '@/utils'

interface Props {
  user: User
  token: string
  id: string
}

type FormData = {
  name: string
  lastName: string
  company: string
  email: string
  phone: string
}

export default function UpdateClientPage({ user, token, id }: Props) {
  const router = useRouter()
  const { login } = useAuthActions()
  login(user, token)

  const { data } = useQuery(GET_CLIENT, {
    variables: {
      getClientId: id
    },
    context: {
      headers: {
        Authorization: token
      }
    }
  })

  const { formData, errors, submitError, setSubmitError, setFormData, handleChange } = useForm<FormData>({
    initialValues: {
      name: '',
      lastName: '',
      email: '',
      company: '',
      phone: ''
    }
  })

  useEffect(() => {
    if (data) {
      const { name, lastName, email, company, phone } = data.getClient as Client
      setFormData({ name, lastName, email, company, phone })
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(errors).some(error => error !== undefined)) {
      setSubmitError('Por favor, complete todos los campos')
      return
    }

    try {
      const { name, lastName, company, email, phone } = formData
      await updateClient(token, id, name, lastName, company, email, phone)

      router.replace('/')
    } catch (error: any) {
      setSubmitError((error as ApolloError).graphQLErrors[0].message)
    }
  }

  return (
    <MainLayout title='Client' pageDescription='CRM clients for company administration'>
      <h1 className='text-3xl text-slate-900 first-letter:text-4xl'>
        Editar cliente con id: <span className='font-medium'>{id}</span>
      </h1>

      <form className='block w-1/2 mx-auto mt-8 bg-white py-4 px-6 shadow-lg' onSubmit={handleSubmit}>
        {submitError && <SubmitError message={submitError} />}

        <InputWrapper inputFor='name' label='Nombre'>
          <input
            type='text'
            id='name'
            name='name'
            placeholder='Nombre del cliente...'
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
            placeholder='Apellidos del cliente...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.lastName}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper inputFor='company' label='Empresa'>
          <input
            type='text'
            id='company'
            name='company'
            placeholder='Empresa del cliente...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.company}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper inputFor='email' label='Email'>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='Email del cliente...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.email}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper inputFor='phone' label='Teléfono'>
          <input
            type='text'
            id='phone'
            name='phone'
            placeholder='Teléfono del cliente...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.phone}
            onChange={handleChange}
          />
        </InputWrapper>

        <button
          className='mt-4 w-full bg-slate-900 py-2 px-4 font-bold text-lg text-center text-white rounded-md shadow-lg transition hover:scale-95'
          type='submit'
        >
          Actualizar cliente
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

  const clientId = typeof id === 'string' ? id : id[0]
  const user = await getUser(token)

  return {
    props: {
      user,
      token,
      id: clientId
    }
  }
}
