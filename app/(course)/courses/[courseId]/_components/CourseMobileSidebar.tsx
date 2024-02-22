import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Chapter, Course, UserProgress } from '@prisma/client';
import { Menu } from 'lucide-react';
import React from 'react'
import CourseSidebar from './CourseSidebar';

interface CourseMobileSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseMobileSidebar = ({course, progressCount}: CourseMobileSidebarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"outline"} size={"icon"} className="flex lg:hidden mr-2 bg-secondary">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent side={"left"} className="p-0 border-l-none w-[20rem]">
        <CourseSidebar course={course} progressCount={progressCount} />
      </SheetContent>
    </Sheet>
  )
}

export default CourseMobileSidebar