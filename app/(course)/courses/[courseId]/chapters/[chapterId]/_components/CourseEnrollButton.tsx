"use client"

import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/formats';
import axios from 'axios';
import { useState } from 'react'
import { toast } from 'sonner';

interface CourseEnrollButtonProps {
  courseId: string;
  price: number;
}

const CourseEnrollButton = ({courseId, price}: CourseEnrollButtonProps) => {
  const [isLoading, setIsloading] = useState(false)
  
  const onClick = async () => {
    try {
      setIsloading(true);
      
      const response = await axios.post(`/api/courses/${courseId}/checkout`);

      window.location.assign(response.data.url)
    } catch (error) {
      toast.error(("something went wrong"));
    } finally {
      setIsloading(false);
    }
  }

  return (
    <Button className='fixed bottom-0 w-full z-50 right-0 py-6 md:py-4 rounded-none md:rounded-full md:relative md:w-auto' disabled={isLoading} onClick={onClick}>
      Enroll For: {formatPrice(price)}
    </Button>
  )
}

export default CourseEnrollButton