import { getCourses } from "@/actions/get-courses";
import { auth, clerkClient } from "@clerk/nextjs";
import { db } from "@/lib/db";

import Categories from "./_components/Categories";
import SearchInput from "@/components/SearchInput";
import { redirect } from "next/navigation";
import CoursesList from "@/components/Course/CoursesList";

interface SearchPageProps {
  searchParams: {
    title: string,
    categoryId: string
  }
}

const Searchpage = async ({searchParams}: SearchPageProps) => {
  const {userId} = auth();
  if(!userId) {
    return redirect("/");
  }

  const categories = await db.category.findMany();
  const courses = await getCourses({
    userId: userId,
    ...searchParams,
  })

  return (
    <>
      <div className="p-6 flex flex-col gap-4 items-center justify-center mt-10 mb-6">
        <h1 className="font-bold text-4xl">Looking for a Course?</h1>
        <SearchInput className="w-full max-w-[500px]" />
      </div>

      <Categories items={categories} />
      <div className="px-6 flex items-center justify-center">
      <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Searchpage;
