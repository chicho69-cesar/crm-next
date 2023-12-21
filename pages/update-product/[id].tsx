/* eslint-disable react-hooks/exhaustive-deps */
import { ApolloError, useQuery } from '@apollo/client'
import { GetServerSideProps } from 'next'
import { useRouter } from 'next/router'
import { useEffect } from 'react'

import { MainLayout } from '@/components/layouts'
import { InputWrapper, SubmitError } from '@/components/ui'
import { GET_PRODUCT } from '@/graphql/client'
import { getUser } from '@/graphql/services/users.queries'
import useAuthActions from '@/hooks/use-auth-actions'
import useForm from '@/hooks/use-form'
import type { Product, User } from '@/interfaces'
import { validateToken } from '@/utils'
import { updateProduct } from '@/graphql/services/products.mutations'

interface Props {
  user: User
  token: string
  id: string
}

type FormData = {
  name: string
  price: string
  existence: string
}

export default function UpdateProductPage({ user, token, id }: Props) {
  const router = useRouter()
  const { login } = useAuthActions()
  login(user, token)

  const { data } = useQuery(GET_PRODUCT, {
    variables: {
      getProductId: id
    }
  })

  const { formData, errors, submitError, setSubmitError, setFormData, handleChange } = useForm<FormData>({
    initialValues: {
      name: '',
      price: '',
      existence: ''
    }
  })

  useEffect(() => {
    if (data) {
      const { name, price, existence } = data.getProduct as Product
      setFormData({ name, price: price.toString(), existence: existence.toString() })
    }
  }, [data])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(errors).some(error => error !== undefined)) {
      setSubmitError('Por favor, complete todos los campos')
      return
    }

    try {
      const { name, price, existence } = formData
      await updateProduct(id, name, Number(existence), Number(price))

      router.replace('/products')
    } catch (error: any) {
      setSubmitError((error as ApolloError).graphQLErrors[0].message)
    }
  }

  return (
    <MainLayout title='Client' pageDescription='CRM clients for company administration'>
      <h1 className='text-3xl text-slate-900 first-letter:text-4xl'>
        Editar producto con id: <span className='font-medium'>{id}</span>
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

        <InputWrapper inputFor='price' label='Precio'>
          <input
            type='text'
            id='price'
            name='price'
            placeholder='Precio del producto...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.price}
            onChange={handleChange}
          />
        </InputWrapper>

        <InputWrapper inputFor='existence' label='Existencias'>
          <input
            type='text'
            id='existence'
            name='existence'
            placeholder='Existencias del producto...'
            className='w-full border-gray-400 border outline-none rounded-md text-gray-800 py-2 px-4'
            value={formData.existence}
            onChange={handleChange}
          />
        </InputWrapper>

        <button
          className='mt-4 w-full bg-slate-900 py-2 px-4 font-bold text-lg text-center text-white rounded-md shadow-lg transition hover:scale-95'
          type='submit'
        >
          Actualizar producto
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
