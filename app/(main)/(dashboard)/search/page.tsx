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

      <Categories items={categories} />
      <div className="px-6 flex items-start flex-wrap gap-6 justify-start overflow-y-scroll bg-secondary mx-3 md:mx-0 py-6 rounded-3xl md:h-[calc(100vh-170px)] md:rounded-none md:rounded-bl-3xl mt-5 md:mt-1 md:rounded-tl-xl">
      <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Searchpage;
