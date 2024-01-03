"use client"

import { Button } from "@/components/ui/button";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { FaCheck, FaX } from "react-icons/fa6";
import { toast } from "sonner";

interface CourseProgressButtonProps {
  chapterId: string;
  courseId: string;
  nextChapterId?: string;
  isCompleted?: boolean;
}

const CourseProgressButton = ({
  chapterId,
  courseId,
  nextChapterId,
  isCompleted,
}: CourseProgressButtonProps) => {
  const router = useRouter();
  const confetti = useConfettiStore();
  const [isLoading, setIsLoading] = useState(false)

  const onClick = async () => {
    try {
      setIsLoading(true)

      const promise = async () => {
        await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/progress`, {
          isCompleted: !isCompleted,
        })
      
        if(!isCompleted && !nextChapterId) {
          confetti.onOpen()
        }
      
        if(!isCompleted && nextChapterId) {
          router.push(`/courses/${courseId}/chapters/${nextChapterId}`)
        }
      
        return 'Chapter updated successfully';
      };

      toast.promise(promise, {
        loading: 'Loading...',
        success: (data) => {
          setIsLoading(false);
          router.refresh();
          return data;
        },
        error: 'Something went wrong',
      });
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {isCompleted ? (
        <Button onClick={onClick} disabled={isLoading} variant="destructive" className="flex gap-2 items-center">
          Mark as not completed <FaX />
        </Button>
      ) : (
        <Button onClick={onClick} disabled={isLoading} className="flex gap-2 items-center">
          Mark as completed <FaCheck />
        </Button>
      )}
    </>
  );
};

export default CourseProgressButton;
