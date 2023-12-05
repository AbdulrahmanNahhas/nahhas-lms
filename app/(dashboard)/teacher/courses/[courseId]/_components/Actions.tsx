"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useConfettiStore } from "@/hooks/use-confetti-store";
import { Loader2 } from "lucide-react";
import { LuTrash2 } from "react-icons/lu";
import ConfirmDelete from "@/components/ConfirmDelete";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  isPublished: boolean;
}

const Actions = ({ disabled, courseId, isPublished }: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useConfettiStore();

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(`/api/courses/${courseId}/unpublish`);
        toast.success("Course unpublished!");
      } else {
        await axios.patch(`/api/courses/${courseId}/publish`);
        toast.success("Course published!");
        confetti.onOpen();
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center gap-x-2">
      <Button
        disabled={disabled || isLoading}
        onClick={onClick}
        variant="outline"
      >
        {isPublished ? "UnPublish" : "Publish"}
      </Button>
      <ConfirmDelete courseId={courseId}>
        <Button
          size={"icon"}
          disabled={isLoading}
          variant="destructive"
        >
          {isLoading ? (
            <Loader2 className="mr-1 animate-spin p-1" />
          ) : (
            <LuTrash2 className="h-4 w-4" />
          )}
        </Button>
      </ConfirmDelete>
    </div>
  );
};

export default Actions;
