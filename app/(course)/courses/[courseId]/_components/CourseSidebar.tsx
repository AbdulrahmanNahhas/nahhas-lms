import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { Chapter, Course, UserProgress } from "@prisma/client";
import { redirect } from "next/navigation";
import React from "react";
import CourseSidebarItem from "./CourseSidebarItem";
import { cn } from "@/lib/utils";

interface CourseSidebarProps {
  course: Course & {
    chapters: (Chapter & {
      userProgress: UserProgress[] | null;
    })[];
  };
  progressCount: number;
}

const CourseSidebar = async ({ course, progressCount }: CourseSidebarProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const purchase = await db.purchase.findUnique({
    where: {
      userId_courseId: {
        userId,
        courseId: course.id,
      },
    },
  });

  return (
    <div className="w-full h-full flex flex-col gap-y-2 shadow-sm overflow-y-auto bg-secondary lg:rounded-br-[50px] border-r border-b">
      <div className="p-6 flex items-center justify-start border-b h-[80px]">
        <h1 className={cn("font-semibold", course.title.length <= 30 && "!text-lg", course.title.length <= 20 && "text-xl")}>
          {course.title}
        </h1>
      </div>
      <div className="flex flex-col w-full md:py-1 gap-2">
        {course.chapters.map((chapter) => (
          <CourseSidebarItem
            key={chapter.id}
            id={chapter.id}
            label={chapter.title}
            isCompleted={!!chapter.userProgress?.[0]?.isCompleted}
            courseId={course.id}
            isLocked={!chapter.isFree && !purchase}
          />
        ))}
      </div>
    </div>
  );
};

export default CourseSidebar;
