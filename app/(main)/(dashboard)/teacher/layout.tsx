import { isTeacher } from '@/lib/teacher';
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation';
import React from 'react'

const TeacherLayout = ({children}: {children: React.ReactNode}) => {
  const {userId} = auth();
  
  if (!isTeacher(userId)) {
    redirect("/")
  }

  return (
    <>
      {children}
    </>
  )
}

export default TeacherLayout