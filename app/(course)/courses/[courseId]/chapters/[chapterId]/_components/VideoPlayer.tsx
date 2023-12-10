"use client";

import { useConfettiStore } from "@/hooks/use-confetti-store";
import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { useMemo, useState } from "react";
import { FaLock } from "react-icons/fa6";
import { toast } from "sonner";

interface VideoPlayerProps {
  url: string;
  isLocked: boolean;
  nextChapterId?: string;
  chapterId: string;
  courseId: string;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  url,
  isLocked,
  nextChapterId,
  chapterId,
  courseId,
  completeOnEnd,
}: VideoPlayerProps) => {
  const ReactPlayer = useMemo(
    () => dynamic(() => import("react-player/lazy"), { ssr: false }),
    []
  );
  const router = useRouter();
  const confetti = useConfettiStore();

  const [isReady, setIsReady] = useState(false);

  const onEnd = async () => {
    try {
      if (completeOnEnd) {
        const promise = async () => {
          await axios.put(
            `/api/courses/${courseId}/chapters/${chapterId}/progress`,
            {
              isCompleted: true,
            }
          );

          return "Progress Updated!";
        };

        toast.promise(promise, {
          loading: "Loading...",
          success: (data) => {
            if (nextChapterId) {
              router.push(`/courses/${courseId}/chapters/${nextChapterId}`);
            }
            router.refresh();
            if (!nextChapterId) {
              confetti.onOpen();
            }
            return data;
          },
          error: "Something went wrong",
        });
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="relative h-full w-full flex items-center justify-center !aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-accent w-full gap-2 !aspect-video rounded-2xl border">
          <Loader2 className="h-6 w-6 animate-spin text-accent-foreground" />
          Loading
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-accent w-full gap-2 !aspect-video rounded-2xl border">
          <FaLock className="h-8 w-8 text-accent-foreground" />
          <p className="text-sm">This Chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer
          url={url.includes("youtube.com") ? `${url}?rel=0` : url}
          width={"100%"}
          className={
            "absolute inset-0 overflow-hidden !aspect-video rounded-2xl border !w-full !h-auto max-h-none"
          }
          onReady={() => setIsReady(true)}
          onEnded={onEnd}
          controls
          autoplay
        />
      )}
    </div>
  );
};

export default VideoPlayer;
