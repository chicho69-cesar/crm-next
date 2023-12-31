interface Props {
  children?: React.ReactNode
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg' | 'xl'
  bgColor?: string
}

export default function Button({ children, size = 'md', onClick, bgColor }: Props) {
  return (
    <button
      className={
        `${bgColor ? bgColor : 'bg-slate-800'}
        text-white font-bold shadow-md rounded-md
        transition hover:scale-95
        ${size === 'sm' && 'py-1 px-4 text-sm'}
        ${size === 'md' && 'py-2 px-6'}
        ${size === 'lg' && 'py-3 px-8'}
        ${size === 'xl' && 'py-4 px-10'}`
      }
      onClick={onClick}
    >
      {children}
    </button>
  )
}
