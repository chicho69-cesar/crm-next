interface Props {
  label: string
  inputFor: string
  error?: string
  children: React.ReactNode
}

export default function InputWrapper({ label, inputFor, error, children }: Props) {
  return (
    <div className='mb-4 flex w-full flex-col flex-nowrap items-start justify-center gap-2'>
      <label htmlFor={inputFor} className='text-gray-800 text-lg text-left font-bold'>
        {label}
      </label>

      {children}

      {error && (
        <div className='my-2 w-full p-4 border-l-4 border-l-red-600 bg-red-200'>
          <p className='text-red-600 text-lg font-extrabold'>Error</p>
          <p className='text-red-600 font-bold'>{error}</p>
        </div>
      )}
    </div>
  )
}
