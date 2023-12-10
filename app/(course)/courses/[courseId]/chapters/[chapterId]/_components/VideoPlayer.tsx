"use client";

import { cn } from "@/lib/utils";
import axios from "axios";
import { Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

import { useMemo, useState } from "react";
import { FaLock } from "react-icons/fa6";
import { toast } from "sonner";

interface VideoPlayerProps {
  url: string;
  isLocked: boolean;
  nextChapterId?: string;
  chapterId: string;
  completeOnEnd: boolean;
}

const VideoPlayer = ({
  url,
  isLocked,
  nextChapterId,
  chapterId,
  completeOnEnd,
}: VideoPlayerProps) => {
  const ReactPlayer = useMemo(
    () => dynamic(() => import("react-player/lazy"), { ssr: false }),
    []
  );

  const [isReady, setIsReady] = useState(false);

  return (
    <div className="relative h-full w-full flex items-center justify-center !aspect-video">
      {!isReady && !isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-accent w-full gap-2 !aspect-video rounded-3xl border">
          <Loader2 className="h-6 w-6 animate-spin text-accent-foreground" />
          Loading
        </div>
      )}
      {isLocked && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-accent w-full gap-2 !aspect-video rounded-3xl border">
          <FaLock className="h-8 w-8 text-accent-foreground" />
          <p className="text-sm">This Chapter is locked</p>
        </div>
      )}
      {!isLocked && (
        <ReactPlayer
          url={url.includes("youtube.com") ? `${url}?rel=0` : url}
          width={"100%"}
          className={
            "absolute inset-0 overflow-hidden !aspect-video rounded-3xl border !w-full !h-auto max-h-none"
          }
          onEnded={() => {
            toast.success("Completed, please wait...");
          }}
          playing={true}
          onReady={() => setIsReady(true)}
          autoplay
          controls
        />
      )}
    </div>
  );
};

export default VideoPlayer;
