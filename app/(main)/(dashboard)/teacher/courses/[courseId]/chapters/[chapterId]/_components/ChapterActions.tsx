"use client";

import { Button } from "@/components/ui/button";
import { LuTrash2 } from "react-icons/lu";
import { useState } from "react";
import { toast } from "sonner";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ChapterActionsProps {
  disabled: boolean;
  courseId: string;
  chapterId: string;
  isPublished: boolean;
}

const ChapterActions = ({
  disabled,
  courseId,
  chapterId,
  isPublished,
}: ChapterActionsProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    try {
      setIsLoading(true);
      if (isPublished) {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/unpublish`
        );
        toast.success("Chapter unpublished!");
      } else {
        await axios.patch(
          `/api/courses/${courseId}/chapters/${chapterId}/publish`
        );
        toast.success("Chapter published!");
      }

      router.refresh();
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}`);

      toast.success("Chapter deleted!");

      router.refresh();
      router.push(`/teacher/courses/${courseId}`);
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

      <Dialog>
        <DialogTrigger asChild>
          <Button
            size={"icon"}
            disabled={disabled || isLoading}
            variant="destructive"
          >
            {isLoading ? (
              <Loader2 className="mr-1 animate-spin p-1" />
            ) : (
              <LuTrash2 className="h-4 w-4" />
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] border">
          <DialogHeader>
            <DialogTitle>Are you absolutely sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete this
              chapter and remove it&apos;s data from our database.
            </DialogDescription>
          </DialogHeader>
          <div className="flex w-full gap-2 items-center">
            <DialogClose asChild>
              <Button
                className="w-full rounded-md hover:scale-100"
                variant="outline"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              className="w-full rounded-md hover:scale-100"
              variant="destructive"
              onClick={onDelete}
              disabled={isLoading}
            >
              Delete Chapter
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ChapterActions;
