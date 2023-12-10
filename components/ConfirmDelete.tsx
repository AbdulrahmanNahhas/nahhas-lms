"use client"

import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from 'axios';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';

interface ConfirmDeleteProps {
  courseId: string;
  children: React.ReactNode;
}

const ConfirmDelete = ({courseId, children}: ConfirmDeleteProps) => {
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
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            chapter and remove it&apos;s data from our database.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild onClick={onDelete}>
            <Button
              variant="destructive"
              className="bg-destructive text-destructive-foreground hover:bg-destructive/75"
            >
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ConfirmDelete