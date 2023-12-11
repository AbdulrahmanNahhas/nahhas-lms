// "use client";

import CourseCard from "@/components/Course/CourseCard";
import { Category, Course } from "@prisma/client";

type CourseWithProgressWithCategory = Course & {
  category: Category | null;
  chapters: { id: string }[];
  progress: number | null;
};

interface CourseListProps {
  items: CourseWithProgressWithCategory[];
}

const CoursesList = ({ items }: CourseListProps) => {
  return (
    <>
      <div className="flex flex-wrap items-center justify-start gap-6">
        {items.map((item) => {
          return (
            <CourseCard
              author={item.author}
              key={item.id}
              id={item.id}
              title={item.title}
              chaptersLength={item.chapters.length}
              imageUrl={item.imageUrl!}
              price={item.price!}
              progress={item.progress}
              category={item?.category?.name}
              description={item.description!}
            />
          );
        })}
      </div>
      <div>
        {items.length === 0 && (
          <div className="container p-6 flex items-center justify-center flex-warp h-full text-muted-foreground bg-accent dark:bg-accent/50 rounded-xl">
            No courses found
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesList;
