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
      <Categories items={categories}/>
      <div className="px-6 overflow-y-scroll bg-secondary mx-0 md:mx-auto py-6 rounded-none md:h-[calc(100vh-170px)] md:rounded-none md:rounded-bl-3xl md:mt-1 md:rounded-tl-xl container">
        <CoursesList items={courses} />
      </div>
    </>
  );
};

export default Searchpage;
