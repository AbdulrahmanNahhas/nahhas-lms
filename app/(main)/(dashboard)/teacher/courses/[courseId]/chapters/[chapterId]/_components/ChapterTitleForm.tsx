"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { FaPencilAlt } from "react-icons/fa";
import { MdOutlineCancel } from "react-icons/md";
import { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { BiLoader } from "react-icons/bi";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ChapterTitleFormProps {
  initialData: {
    title: string;
  };
  courseId: string;
  chapterId: string;
}

const formSchema = z.object({
  title: z.string().min(1),
});

const ChapterTitleForm = ({ initialData, courseId, chapterId }: ChapterTitleFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}`, values)
      toast.success("Chapter Updated!");
      toggleEdit();
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className=" border bg-accent/50 dark:bg-accent/20 rounded-lg p-4  ">
      <div className="font-medium text-lg flex items-start justify-between">
        <span className="flex items-center justify-center gap-2">
          {isSubmitting && <BiLoader className="animate-spin w-5 h-5" />}
          Chapter Title
        </span>
        <Button variant={"ghost"} onClick={toggleEdit}>
          {isEditing ? (
            <>
              <MdOutlineCancel className="h-4 w-4 mr-2" />
              Cancel
            </>
          ) : (
            <>
              <FaPencilAlt className="h-4 w-4 mr-2" />
              Edit Text
            </>
          )}
        </Button>
      </div>
      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 xl:space-y-0 mt-3 xl:flex xl:gap-2 xl:w-full xl:justify-start xl:items-start">
            <FormField control={form.control} name="title" render={({field} ) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input disabled={isSubmitting} placeholder="e.g. 'Introduction to the course'" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}></FormField>
            <div className="flex items-center gap-x-2">
              <Button disabled={!isValid || isSubmitting}
              type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <p className="mt-0 text-sm">{initialData.title}</p>
      )}
    </div>
  );
};

export default ChapterTitleForm;
