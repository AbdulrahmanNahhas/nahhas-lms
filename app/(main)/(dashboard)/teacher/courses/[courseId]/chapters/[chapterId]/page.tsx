import { Banner } from "@/components/ui/banner";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { BiSolidCustomize } from "react-icons/bi";
import { FaEye, FaVideo } from "react-icons/fa";
import ChapterTitleForm from "./_components/ChapterTitleForm";
import ChapterDescriptionForm from "./_components/ChapterDescriptionForm";
import ChapterAccessFormForm from "./_components/ChapterAccessForm";
import ChapterVideoForm from "./_components/ChapterVideoForm";
import ChapterActions from "./_components/ChapterActions";

const page = async ({params}: {params: { courseId: string; chapterId: string };}) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const chapter = await db.chapter.findUnique({
    where: {
      id: params.chapterId,
      courseId: params.courseId,
    },
  });
  if (!chapter) {
    return redirect("/");
  }

  const requiredFields = [chapter.title, chapter.description, chapter.videoUrl];
  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;
  const completionText = `(${completedFields}/${totalFields})`;
  const isComplete = requiredFields.every(Boolean);

  return (
    <>
      {!chapter.isPublished && (
        <Banner
          variant="warning"
          label="This chapter is unpublished. It will not be visible in the course"
        />
      )}
      <div className="container p-6">
        <div className="flex flex-col justify-center gap-0">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}`}
              className="inline-flex items-center text-sm hover:opacity-75 transition mb-4 hover:bg-accent py-1 px-3 rounded-full w-auto"
            >
              <ArrowLeftIcon className="h-4 w-4 mr-2" />
              Back to course setup
            </Link>

            <div className="flex items-center justify-between w-full">
              <div className="flex flex-col gap-y-2">
                <h1 className="text-2xl font-medium">Chapter Creation</h1>
                <span className="text-sm text-muted-foreground">
                  Complete all fields {completionText}
                </span>
              </div>
              <ChapterActions
                disabled={!isComplete}
                courseId={params.courseId}
                chapterId={params.chapterId}
                isPublished={chapter.isPublished}
              />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <BiSolidCustomize className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />
              <h2 className="text-xl">Customize your Chapter</h2>
            </div>
            <ChapterTitleForm
              initialData={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
            />
            <ChapterDescriptionForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
          </div>
          <div className="space-y-4">
            <div className="flex items-center gap-x-2">
              <FaEye className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />
              <h2 className="text-xl">Access Settings</h2>
            </div>
            <ChapterAccessFormForm
                initialData={chapter}
                courseId={params.courseId}
                chapterId={params.chapterId}
              />
            <div className="flex items-center gap-x-2">
              <FaVideo className="w-8 h-8 p-2 bg-accent rounded-lg text-primary" />
              <h2 className="text-xl">Add video</h2>
            </div>
            <ChapterVideoForm
              initialData={chapter}
              chapterId={params.chapterId}
              courseId={params.courseId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
