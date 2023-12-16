import Link from 'next/link'

interface Props {
  to: string
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg' | 'xl'
  bgColor?: string
}

export default function LinkButton({ children, size = 'md', bgColor, to }: Props) {
  return (
    <Link
      href={to}
      className={
        `${bgColor ? bgColor : 'bg-slate-800'}
        text-white font-bold shadow-md rounded-md
        transition hover:scale-95 inline-block
        ${size === 'sm' && 'py-1 px-4 text-sm'}
        ${size === 'md' && 'py-2 px-6'}
        ${size === 'lg' && 'py-3 px-8'}
        ${size === 'xl' && 'py-4 px-10'}`
      }
    >
      {children}
    </Link>
  )
}
