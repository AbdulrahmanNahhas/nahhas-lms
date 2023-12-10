import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formats';
import React from 'react'

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({courseId, price}: CourseEnrollButtonProps) => {
  return (
    <Button className='fixed bottom-0 w-full z-50 right-0 py-6 md:py-4 rounded-none md:rounded-full md:relative md:w-auto'>
      Enroll For: {formatPrice(price)}
    </Button>
  )
}

export default CourseEnrollButton