import { InputWrapper, SubmitError } from '@/components/auth'
import { AuthLayout } from '@/components/layouts'
import { client } from '@/graphql/apollo-client'
import { AUTHENTICATE_USER } from '@/graphql/client'
import { useAppSelector } from '@/hooks/store'
import { setSession } from '@/utils/session'
import { ApolloError } from '@apollo/client'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function LoginPage() {
  const router = useRouter()
  const auth = useAppSelector((state) => state.auth)

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const [errors, setErrors] = useState({
    email: null,
    password: null
  })

  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })

    if (e.target.value === '' || !e.target.value) setErrors({
      ...errors,
      [e.target.name]: `El ${e.target.name} es requerido`
    })
    else setErrors({ ...errors, [e.target.name]: null })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(errors).some(error => error !== null)) {
      setSubmitError('Por favor, complete todos los campos')
      return
    }

    try {
      const { data } = await client.mutate<any>({
        mutation: AUTHENTICATE_USER,
        variables: {
          input: { ...formData }
        }
      })

      const { authenticateUser: { token } } = data
      await setSession(token)
      console.log(auth)

      router.replace('/')
    } catch (error: any) {
      setSubmitError((error as ApolloError).graphQLErrors[0].message)
    }
  }

  return (
    <AuthLayout title='Login'>
      <main className='min-h-screen bg-slate-900 grid place-content-center'>
        <h1 className='w-full text-center text-3xl text-white mb-4'>Login</h1>

        {submitError && <SubmitError message={submitError} />}

        <form className='my-4 bg-white shadow-lg p-8 rounded-md w-96' onSubmit={handleSubmit}>
          <InputWrapper label='Email' inputFor='email' error={errors.email}>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='johndoe@gmail.com'
              className='w-full border-gray-800 border outline-none rounded-md text-gray-800 py-2 px-4'
              value={formData.email}
              onChange={handleChange}
            />
          </InputWrapper>

          <InputWrapper label='Password' inputFor='password' error={errors.password}>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='password...'
              className='w-full border-gray-800 border outline-none rounded-md text-gray-800 py-2 px-4'
              value={formData.password}
              onChange={handleChange}
            />
          </InputWrapper>

          <button
            className='mt-4 w-full bg-slate-900 py-2 px-4 font-bold text-lg text-center text-white rounded-md shadow-lg transition hover:scale-95'
            type='submit'
          >
            Iniciar sesión
          </button>
        </form>
      </main>
    </AuthLayout>
  )
}
