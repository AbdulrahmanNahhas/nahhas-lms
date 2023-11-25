"use client";

interface courseProps {
  image: string;
  title: string;
}

const CourseImage = ({ course }: { course: courseProps }) => {
  return (
    <div
      className="w-full max-w-[440px] max-h-[240px] rounded-xl border-2 !mx-4 group relative overflow-hidden"    >
      <span className="opacity-0 duration-300 group-hover:opacity-100 absolute z-50 bottom-0 left-0 text-foreground bg-background px-4 py-2 text-lg rounded-tr-xl">
        {course.title}
      </span>
      <img src={course.image} alt="" />
    </div>
  );
};

export default CourseImage;
