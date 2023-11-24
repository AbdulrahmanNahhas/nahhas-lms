import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const page = () => {
  return (
    <div className='font-bold text-6xl flex flex-col items-center justify-center h-full'>
      <h1>Home Screen</h1>
      <Link href="/dashboard" className={cn(buttonVariants({variant:"link"}),"text-3xl mt-2")}>
        Dashboard
      </Link>
    </div>
  )
}

export default page