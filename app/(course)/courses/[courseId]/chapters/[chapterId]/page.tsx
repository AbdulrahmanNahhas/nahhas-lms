import { db } from "@/lib/db";
import React from "react";
import VideoPlayer from "./_components/VideoPlayer";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { getChapter } from "@/actions/get-chapter";
import { Banner } from "@/components/ui/banner";

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

      <div className="flex flex-col items-center justify-center mx-auto pb-20 max-w-4xl h-full">
        <div className="p-4 md:p-6 h-full w-full">
          <VideoPlayer
            url={chapter.videoUrl || ""}
            isLocked={isLocked}
            nextChapterId={nextChapter?.id}
            chapterId={params.chapterId}
            completeOnEnd={completeOnEnd}
          />
        </div>
      </div>
    </div>
  );
};

export default page;