"use client";

import React from "react";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ConfirmDeleteProps {
  courseId: string;
  children: React.ReactNode;
}

const ConfirmDelete = ({ courseId, children }: ConfirmDeleteProps) => {
  const router = useRouter();

  const onDelete = async () => {
    try {
      await axios.delete(`/api/courses/${courseId}`);

      toast.success("Course deleted!");

      router.refresh();
      router.push(`/teacher/courses/`);
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Dialog>
    <DialogTrigger asChild>
      {children}  
    </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] border">
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete this
            course and remove it&apos;s data from our database.
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
          >
            Delete Course
          </Button>
        </div>
      </DialogContent>

    </Dialog>
  );
};

export default ConfirmDelete;
