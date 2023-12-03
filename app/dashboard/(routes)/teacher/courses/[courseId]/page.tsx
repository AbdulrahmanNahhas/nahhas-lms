import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FaListCheck } from "react-icons/fa6";
import { BiSolidCustomize } from "react-icons/bi";
import { BsCurrencyDollar } from "react-icons/bs";
import { FaFileInvoice } from "react-icons/fa";
import TitleForm from "./_components/TitleForm";
import DescriptionForm from "./_components/DescriptionForm";
import ImageForm from "./_components/ImageForm";
import CategoryForm from "./_components/CategoryForm";
import PriceForm from "./_components/PriceForm";
import ChaptersForm from "./_components/ChaptersForm";

const Course = async ({ params }: { params: { courseId: string } }) => {
  const { userId } = auth();

  if (!userId) {
    console.log("You aren't signed in to your account.");
    return redirect("/dashboard/teacher/courses");
  }
  const courseId = params.courseId;
  const course = await db.course.findUnique({
    where: {
      id: courseId,
      userId: userId,
    },
    include: {
      chapters: {
        orderBy: {
          position: "asc"
        }
      }
    }
  });

  const categories = await db.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!course) {
    console.log("Course not found!");
    return redirect("/dashboard/search");
  }

  const requiredFields = [
    course.title,
    course.description,
    course.imageUrl,
    course.price != undefined,
    course.categoryId,
    course.chapters.some(chapter => chapter.isPublished),
  ];
  const totalFileds = requiredFields.length;
  const completedFileds = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFileds}/${totalFileds})`;

  return (
    <div className="container p-6 md:flex md:flex-col md:items-start md:justify-center min-h-full">
      <div className="flex items-start justify-center flex-col">
        <h1 className="text-5xl font-bold mb-2">Completing Course Info</h1>
        <span className="text-sm text-muted-foreground">
          Complete all fields {completionText}
        </span>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-12 gap-6 w-full">
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <BiSolidCustomize className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />
            <h2 className="text-xl">Customize your course</h2>
          </div>
          <TitleForm initialData={course} courseId={courseId} />
          <DescriptionForm initialData={course} courseId={courseId} />
          <CategoryForm
            initialData={course}
            courseId={courseId}
            options={categories.map((category) => ({
              label: category.name,
              value: category.id,
            }))}
          />
          <ImageForm initialData={course} courseId={courseId} />
        </div>
        <div className="space-y-6">
          <div className="flex items-center gap-x-2">
            <FaListCheck className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />
            <h2 className="text-xl">Course chapters</h2>
          </div>
          <ChaptersForm initialData={course} courseId={courseId} />
          <div className="flex items-center gap-x-2">
            <BsCurrencyDollar className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />
            <h2 className="text-xl">Sell your course</h2>
          </div>
          <PriceForm initialData={course} courseId={courseId} />
        </div>
      </div>
    </div>
  );
};

export default Course;
