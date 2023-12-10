"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { MdOutlineCancel } from "react-icons/md";
import { Suspense, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Chapter, Course } from "@prisma/client";
import { RiVideoAddFill } from "react-icons/ri";
import ChaptersList from "./ChaptersList";
import { BiLoader } from "react-icons/bi";

interface ChapterFormProps {
  initialData: Course & { chapters: Chapter[] };
  courseId: string;
}
const formSchema = z.object({
  title: z.string().min(1),
});

const ChaptersForm = ({ initialData, courseId }: ChapterFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();
  const toggleCreating = () => {
    setIsCreating((current) => !current);
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });
  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      console.log(values);
      await axios.post(`/api/courses/${courseId}/chapters`, values);
      toast.success("Chapter Created!");
      toggleCreating();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };
  const onEdit = (id: string) => {
    router.push(`/teacher/courses/${courseId}/chapters/${id}`);
  };
  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);

      await axios.put(`/api/courses/${courseId}/chapters/reorder`, {
        list: updateData,
      });

      toast.success("Chapters reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className=" border bg-accent/50 dark:bg-accent/20 rounded-lg p-4 relative overflow-hidden">
      {isUpdating && (
        <div className="bg-background/75 absolute top-0 h-full w-full left-0 flex items-center justify-center">
          <BiLoader className="animate-spin w-6 h-6 md:w-10 md:h-10" />
        </div>
      )}
      <div className="font-medium text-lg flex items-start justify-between">
        <span>
          Course Chapter <span className="text-red-500">*</span>
        </span>
        <Button variant={"ghost"} onClick={toggleCreating}>
          {isCreating ? (
            <>
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <RiVideoAddFill className="h-4 w-4 mr-2" />
              Add a Chapter
            </>
          )}
        </Button>
      </div>

      {isCreating ? (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-3"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormControl>
                    <Input
                      disabled={isSubmitting}
                      placeholder="e.g. 'Introduction to the Course'"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            ></FormField>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting} type="submit">
                {!isValid ||
                  (isSubmitting && <BiLoader className="mr-1 animate-spin" />)}
                Create
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div
          className={cn(
            "mt-2 text-sm",
            !initialData.chapters.length &&
              "text-muted-foreground italic bg-accent p-4 md:p-6 text-center rounded-lg cursor-not-allowed"
          )}
        >
          {!initialData.chapters.length ? (
            <p>No chapters</p>
          ) : (
            <ChaptersList
              onEdit={onEdit}
              onReorder={onReorder}
              items={initialData.chapters || []}
            />
          )}
        </div>
      )}

      {!isCreating && (
        <span className="text-xs text-muted-foreground mt-4">
          Drag and drop to reorder chapters
        </span>
      )}
    </div>
  );
};

export default ChaptersForm;
