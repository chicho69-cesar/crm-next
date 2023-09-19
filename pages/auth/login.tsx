import { InputWrapper, SubmitError } from '@/components/auth'
import { AuthLayout } from '@/components/layouts'

export default function LoginPage() {
  return (
    <AuthLayout title='Login'>
      <main className='min-h-screen bg-slate-900 grid place-content-center'>
        <h1 className='w-full text-center text-3xl text-white mb-4'>Login</h1>

        <SubmitError message='El usuario no existe' />

        <form className='my-4 bg-white shadow-lg p-8 rounded-md w-96'>
          <InputWrapper label='Email' inputFor='email' error='El Email no puede ir vació'>
            <input
              type='text'
              id='email'
              name='email'
              placeholder='johndoe@gmail.com'
              className='w-full border-gray-800 border outline-none rounded-md text-gray-800 py-2 px-4'
            />
          </InputWrapper>

          <InputWrapper label='Password' inputFor='password'>
            <input
              type='password'
              id='password'
              name='password'
              placeholder='password...'
              className='w-full border-gray-800 border outline-none rounded-md text-gray-800 py-2 px-4'
            />
          </InputWrapper>

          <button
            className='mt-4 w-full bg-slate-900 py-2 px-4 font-bold text-lg text-center rounded-md shadow-lg transition hover:scale-95'
          >
            Iniciar sesión
          </button>
        </form>
      </main>
    </AuthLayout>
  )
}
