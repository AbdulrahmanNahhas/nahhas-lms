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
      <div className="grid sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
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
          <div className="container p-6 flex items-center justify-center text-muted-foreground bg-accent dark:bg-accent/50 rounded-xl h-full w-full">
            No courses found
          </div>
        )}
      </div>
    </>
  );
};

export default CoursesList;
