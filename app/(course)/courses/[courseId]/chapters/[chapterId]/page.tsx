import { db } from "@/lib/db";
import React from "react";
import VideoPlayer from "./_components/VideoPlayer";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/ui/banner";
import Preview from "@/components/Preview";
import { Button } from "@/components/ui/button";
import { FaCheck } from "react-icons/fa6";
import CourseEnrollButton from "./_components/CourseEnrollButton";

interface ChapterProps {
  params: {
    chapterId: string;
    courseId: string;
  };
}

const page = async ({ params }: ChapterProps) => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }

  const { chapter, course, nextChapter, userProgress, purchase } =
    await getChapter({
      userId,
      chapterId: params.chapterId,
      courseId: params.courseId,
    });
  if (!chapter || !course) {
    return redirect("/");
  }

  const isLocked = !chapter.isFree && !purchase;
  const completeOnEnd = !!purchase && !userProgress?.isCompleted;

  return (
    <div className="h-full w-full">
      {userProgress?.isCompleted && (
        <Banner label="You already completed this chapter" variant="success" />
      )}
      {isLocked && (
        <Banner
          label="You need to purchase this course to watch this chapter."
          variant="warning"
        />
      )}

      <div className="flex flex-col mx-auto !pb-10">
        <div className="p-4 md:p-6 w-full">
          <VideoPlayer
            url={chapter.videoUrl || ""}
            isLocked={isLocked}
            nextChapterId={nextChapter?.id}
            chapterId={params.chapterId}
            completeOnEnd={completeOnEnd}
          />
        </div>
        <div className="p-4 flex flex-col">
          <div className="flex flex-col md:flex-row items-center justify-between mb-2 px-0 md:px-4 gap-2">
            <h2 className="text-2xl font-semibold">{chapter.title}</h2>
            {purchase ? (
              <Button className="flex gap-2 items-center">
                Mark as complete <FaCheck />
              </Button>
            ) : (
              <CourseEnrollButton
                courseId={params.courseId}
                price={course.price!}
              />
            )}
          </div>
          <Preview value={chapter.description!} />
        </div>
      </div>
    </div>
  );
};

export default page;
