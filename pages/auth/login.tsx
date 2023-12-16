import { ApolloError } from '@apollo/client'
import { useRouter } from 'next/router'

import { AuthLayout } from '@/components/layouts'
import { InputWrapper, SubmitError } from '@/components/ui'
import { authenticateUser } from '@/graphql/services/users.mutations'
import useForm from '@/hooks/use-form'
import { setSession } from '@/utils/session'

type FormData = {
  email: string
  password: string
} 

export default function LoginPage() {
  const router = useRouter()
  const { formData, errors, submitError, setSubmitError, handleChange } = useForm<FormData>({
    initialValues: {
      email: '',
      password: ''
    }
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (Object.values(errors).some(error => error !== undefined)) {
      setSubmitError('Por favor, complete todos los campos')
      return
    }

    try {
      const token = await authenticateUser(formData.email, formData.password)
      await setSession(token)
      
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
