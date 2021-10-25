import Head from 'next/head'
import React from 'react'

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Naslu</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="flex text-6xl font-bold">
          Welcome to{' '}
          <p className="text-indigo-600 cursor-hand pl-3">
            Naslu
          </p>
        </h1>
      </main>
    </div>
  )
}