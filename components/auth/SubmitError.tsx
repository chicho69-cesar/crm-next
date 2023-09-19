interface Props {
  message: string
}

export default function SubmitError({ message }: Props) {
  return (
    <div className='w-full text-center bg-white p-2 rounded-md shadow-lg'>
      <p className='text-red-600 font-bold text-lg'>
        {message}
      </p>
    </div>
  )
}
