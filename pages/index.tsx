import { GetServerSideProps } from 'next'
import Link from 'next/link'
import { Inter } from 'next/font/google'

import { client } from '@/graphql/apollo-client'
import { HELLO } from '@/graphql/client'

const inter = Inter({ subsets: ['latin'] })

interface Props {
  message: string
}

export default function Home({ message }: Props) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <Link href='/api/graphql' className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Go to the GraphQL Playground
        </Link>

        <h1 className='text-3xl text-slate-100 first-letter:text-4xl'>
          {message}
        </h1>
      </div>
    </main>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { data } = await client.query({
    query: HELLO
  })

  return {
    props: {
      message: data.hello
    }
  }
}
