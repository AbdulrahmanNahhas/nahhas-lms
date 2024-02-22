import NavbarRoutes from '@/components/NavbarRoutes';
import { Chapter, Course, UserProgress } from '@prisma/client';
import React from 'react'
import CourseMobileSidebar from './CourseMobileSidebar';

interface CourseNavbarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseNavbar = ({course, progressCount}: CourseNavbarProps) => {
  return (
    <div className='flex items-center justify-center px-4 h-full bg-background'>
      <CourseMobileSidebar
        course={course}
        progressCount={progressCount}
      />
      <NavbarRoutes />
    </div>
  )
}

export default CourseNavbar