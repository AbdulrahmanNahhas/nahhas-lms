import { DataTable } from "./_components/data-table";
import { columns } from "./_components/columns";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { db } from "@/lib/db";

const CoursesPage = async () => {
  const { userId } = auth();
  if (!userId) {    
    return redirect("/");
  }

  const courses = await db.course.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-6 md:p-12 bg-secondary/50 text-secondary-foreground min-h-[calc(100vh-80px)] md:rounded-tl-3xl">
      <div className="flex flex-col mb-8 gap-2">
        <h1 className="text-4xl font-bold">Your Courses</h1>
        <p className="text-muted-foreground">
          Here is list of all your courses
        </p>
      </div>
      <DataTable columns={columns} data={courses} />
    </div>
  );
};

export default CoursesPage;
