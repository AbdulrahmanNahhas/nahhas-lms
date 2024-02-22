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
    <div className="w-full h-full flex flex-col gap-y-4 overflow-y-auto bg-secondary m-4 rounded-3xl border">
      <div className="p-6 pb-2">
        <h1
          className={cn(
            "font-semibold",
            course.title.length <= 30 && "!text-lg",
            course.title.length <= 20 && "text-xl"
          )}
        >
          {course.title}
        </h1>
        {purchase && (
          <>
            <div className="mt-2 rounded-full bg-primary/10">
              <div
                className={`h-[4px] w-${progressCount} bg-primary rounded-full`}
                style={{ width: `${progressCount}%` }}
              ></div>
            </div>
            <p
              className={cn(
                "text-sm text-muted-foreground mt-1",
                progressCount === 100 && "text-primary"
              )}
            >
              {Math.round(progressCount)}% Complete
            </p>
          </>
        )}
      </div>
      <div className="flex flex-col w-full pb-6 gap-2 w-full">
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
